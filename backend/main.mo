actor {
  var totalProcessed = 0;

  public query ({ caller }) func getTotalProcessed() : async Nat {
    totalProcessed;
  };

  public shared ({ caller }) func recordProcessed() : async () {
    totalProcessed += 1;
  };
};
