import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type Blog = {
    id : Nat;
    title : Text;
    content : Text;
    timestamp : Time.Time;
    published : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  let blogs = Map.empty<Nat, Blog>();
  var nextBlogId = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createBlog(title : Text, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    let blog : Blog = {
      id = nextBlogId;
      title;
      content;
      timestamp = Time.now();
      published = false;
    };
    blogs.add(nextBlogId, blog);
    nextBlogId += 1;
    blog.id;
  };

  public shared ({ caller }) func editBlog(blogId : Nat, title : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit blog posts");
    };
    switch (blogs.get(blogId)) {
      case (null) { Runtime.trap("Blog not found") };
      case (?oldBlog) {
        let updatedBlog = {
          oldBlog with
          title;
          content;
        };
        blogs.add(blogId, updatedBlog);
      };
    };
  };

  public shared ({ caller }) func setPublishedStatus(blogId : Nat, published : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can publish/unpublish blog posts");
    };
    switch (blogs.get(blogId)) {
      case (null) { Runtime.trap("Blog not found") };
      case (?oldBlog) {
        let updatedBlog = {
          oldBlog with
          published;
        };
        blogs.add(blogId, updatedBlog);
      };
    };
  };

  public shared ({ caller }) func deleteBlog(blogId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    switch (blogs.get(blogId)) {
      case (null) { Runtime.trap("Blog not found") };
      case (?_) {
        blogs.remove(blogId);
      };
    };
  };

  public query ({ caller }) func getBlog(blogId : Nat) : async ?Blog {
    switch (blogs.get(blogId)) {
      case (null) { null };
      case (?blog) {
        // Admins can see all blogs, public users can only see published blogs
        if (blog.published or AccessControl.isAdmin(accessControlState, caller)) {
          ?blog;
        } else {
          null;
        };
      };
    };
  };

  public query ({ caller }) func getAllBlogs() : async [Blog] {
    let blogList = List.empty<Blog>();
    let isAdminUser = AccessControl.isAdmin(accessControlState, caller);

    for (blog in blogs.values()) {
      // Admins can see all blogs, public users can only see published blogs
      if (blog.published or isAdminUser) {
        blogList.add(blog);
      };
    };
    blogList.reverse().toArray();
  };
};
