require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const allowed = [process.env.FRONTEND_ORIGIN];
app.use(cors({ origin: allowed, credentials: true }));
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const lockerRoutes = require("./routes/lockers");
const viewRoutes = require("./routes/view");

app.use("/api/lockers", lockerRoutes);
app.use("/api/view", viewRoutes);

app.get("/", (req, res) => res.send("API is running"));

// Render sets PORT for you
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
