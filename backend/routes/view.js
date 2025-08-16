const express = require("express");
const bcrypt = require("bcryptjs");
const Locker = require("../models/Locker");
const router = express.Router();

// view locker
router.get("/:shortCode", async (req, res) => {
    console.log("[VIEW GET] url:", req.originalUrl);
    console.log("[VIEW GET] params:", req.params);

    try {
        const { shortCode } = req.params;
        console.log("[VIEW GET] public view shortCode:", shortCode);

        const locker = await Locker.findOne({ shortCode });
        console.log("[VIEW GET] locker found?", !!locker);

        if (!locker) return res.status(404).json({ error: "Locker not found" });
        if (new Date() > locker.expirationDate) return res.status(410).json({ error: "Link Expired" });

        return res.json({
            title: locker.title,
            requiresPassword: !!locker.passwordHash,
            expirationDate: locker.expirationDate,
            views: locker.views,
        });
    } catch (err) {
        console.error("[VIEW GET] error:", err);
        return res.status(500).json({ error: "Server Error" });
    }
});

// unlock locker
router.post("/:shortCode/unlock", async (req, res) => {
    console.log("[UNLOCK POST] url:", req.originalUrl);
    console.log("[UNLOCK POST] params:", req.params);
    console.log("[UNLOCK POST] body:", req.body);

    try {
        const { shortCode } = req.params;
        const { password } = req.body || {};
        console.log("[UNLOCK POST] shortCode:", shortCode, "passwordProvided:", !!password);

        const locker = await Locker.findOne({ shortCode });
        console.log("[UNLOCK POST] locker found?", !!locker);

        if (!locker) return res.status(404).json({ error: "Locker not found" });
        if (new Date() > locker.expirationDate) return res.status(410).json({ error: "Link Expired" });

        if (!locker.passwordHash) {
            locker.views += 1;
            await locker.save();
            return res.json({ destinationUrl: locker.destinationUrl });
        }

        const match = await bcrypt.compare(password || "", locker.passwordHash);
        if (!match) return res.status(401).json({ error: "Invalid password" });

        locker.views += 1;
        await locker.save();
        return res.json({ destinationUrl: locker.destinationUrl });
    } catch (err) {
        console.error("[UNLOCK POST] error:", err);
        return res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
