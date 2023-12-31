const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const surveyRoutes = require("./src/routes/surveyRoutes");
const connectDB = require("./src/utils/db");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/auth", authRoutes);
app.use("/surveys", surveyRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
