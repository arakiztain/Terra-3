db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.testCollection.insertMany([
  { name: "Item 1", value: 123 },
  { name: "Item 2", value: 456 }
]);
