const { MongoClient } = require("mongodb");

let db;
const databaseMiddleware = async (req, res, next) => {
  // Connect to MongoDB
  const mongoClient = await new MongoClient(process.env.MONGO_URI).connect();
  db = mongoClient.db(process.env.MONGO_DB);

  req.db = db;

  next();
};

// Export database
module.exports = databaseMiddleware;
