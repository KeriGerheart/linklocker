require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const lockerRoutes = require("./routes/lockers");

app.use("/api/lockers", lockerRoutes);

app.get("/", (req, res) => res.send("API is running"));
app.listen(3001, () => console.log("Server running on port 3001"));
