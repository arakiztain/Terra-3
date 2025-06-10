db = db.getSiblingDB("terra");

db.users.insertMany([
  {
    _id: ObjectId("683ec235d45d5295516ab384"),
    email: "admin@example.com",
    password: "$2a$12$rbBzXbqPPpSvC.Ym/zCnvuhvOwkMoqPAxT2wrmVI6bkJ6jci84iZi",
    role: "admin",
    activationToken: "optional_activation_token"
  }
]);