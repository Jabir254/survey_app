const { MongoClient } = require("mongodb");

// Replace <your_connection_string> with the actual connection string from MongoDB Atlas
const uri =
  "mongodb+srv://jabir:Abdirahman21@cluster.q3bh2b9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to mongoDB:", error);
  }
}

connectToMongoDB();
