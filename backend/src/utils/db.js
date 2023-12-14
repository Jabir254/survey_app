const mongoose = require("mongoose");

const url =
  "mongodb+srv://jabir:Abdirahman21@cluster.q3bh2b9.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the MongoDB database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
