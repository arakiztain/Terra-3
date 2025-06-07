db = db.getSiblingDB(process.env.DB_NAME);

db.users.insertMany([
  {
    _id: ObjectId("683ec235d45d5295516ab384"),
    email: "admin@example.com",
    password: "$2a$12$BggxYvqPX7FlpfLk5HqtduVqv1Kce1uujXKs9WOjoRnoGwGvlop9m",
    role: "admin",
    activationToken: "optional_activation_token"
  },
  {
    _id: ObjectId("683ec2b8d45d5295516ab385"),
    email: "user@example.com",
    password: "$2a$12$fGc50b0dWszrt7Ulh3P6fObNUHMUv.ANP67XWlSdWDHpjzzAKbByy",
    role: "user",
    activationToken: "optional_activation_token"
  },
  {
    _id: ObjectId("683ec2f5d45d5295516ab386"),
    email: "levitzawindorenae@gmail.com",
    password: "$2b$10$v7E4iQOPn3WZmigPntewwOjlqxTv3ORzsjmk1z1Sw0zIfBGonJihu",
    role: "client",
    createdAt: ISODate("2025-06-03T10:15:58.313Z")
  }
]);

db.projects.insertMany([
  {
    _id: ObjectId("6840172e8a25d3c54b7945f3"),
    title: "https://chatgpt.com/",
    description: "https://chatgpt.com/",
    users: [],
    url: "https://chatgpt.com/",
    createdAt: ISODate("2025-06-04T09:51:42.909Z"),
    __v: 0
  },
  {
    _id: ObjectId("684017558a25d3c54b7945f8"),
    title: "https://chatgpt.com/dfghgdfghdfg",
    description: "asdhttps://chatgpt.com/asdasda",
    users: [],
    url: "https://chatgpt.com/dfghdfgh",
    createdAt: ISODate("2025-06-04T09:52:21.306Z"),
    __v: 0
  },
  {
    _id: ObjectId("684018d1f66978aaf4db9b48"),
    title: "https://chatgpt.com/",
    description: "https://chatgpt.com/",
    users: [
      ObjectId("683ec235d45d5295516ab384"),
      ObjectId("683ec2b8d45d5295516ab385")
    ],
    url: "https://chatgpt.com/",
    createdAt: ISODate("2025-06-04T09:58:41.150Z"),
    __v: 0
  }
]);
