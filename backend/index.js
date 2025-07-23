require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected"));

app.get("/", (req, res) => res.send("API is running"));
app.listen(3001, () => console.log("Server running on port 3001"));
