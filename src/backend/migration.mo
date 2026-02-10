module {
  type OldActor = {
    siteLive : Bool;
  };

  type NewActor = {
    siteLive : ?Bool;
  };

  public func run(old : OldActor) : NewActor {
    { siteLive = if (old.siteLive) { ?true } else { null } };
  };
};
