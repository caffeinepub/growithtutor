import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface Blog {
    id: bigint;
    title: string;
    content: string;
    published: boolean;
    timestamp: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAllowedAdminEmail(email: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlog(title: string, content: string): Promise<bigint>;
    deleteBlog(blogId: bigint): Promise<void>;
    editBlog(blogId: bigint, title: string, content: string): Promise<void>;
    getAllBlogs(): Promise<Array<Blog>>;
    getAllowedAdminEmails(): Promise<Array<string>>;
    getBlog(blogId: bigint): Promise<Blog | null>;
    getCallerEmail(): Promise<string | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserEmail(user: Principal): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isSiteLive(): Promise<boolean>;
    performAllowListAdminBootstrap(secret: string): Promise<void>;
    performDefaultAdminBootstrap(secret: string): Promise<void>;
    removeAllowedAdminEmail(email: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setEmail(email: string): Promise<void>;
    setPublishedStatus(blogId: bigint, published: boolean): Promise<void>;
    setSiteLive(isLive: boolean): Promise<void>;
}
