const express = require("express");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const Locker = require("../models/Locker");

const router = express.Router();

//create a new locker
router.post("/", async (req, res) => {
    try {
        const { title, destinationUrl, password, expirationDays, ownerId } = req.body;

        if (!title || !destinationUrl || !expirationDays || !ownerId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let passwordHash;
        if (password && password.trim() !== "") {
            passwordHash = await bcrypt.hash(password, 10);
        }

        const shortCode = nanoid(6);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + Number(expirationDays));

        const newLocker = new Locker({
            title,
            destinationUrl,
            shortCode,
            passwordHash,
            expirationDate,
            ownerId,
        });

        await newLocker.save();

        return res.status(201).json({
            message: "Locker created!",
            locker: {
                id: newLocker._id,
                shortCode: newLocker.shortCode,
                expirationDate: newLocker.expirationDate,
            },
        });
    } catch (error) {
        console.error("Error creating locker:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

//retrieve locker details
router.get("/:shortcode", async (req, res) => {
    try {
        const locker = await Locker.findOne({ shortCode: req.params.shortCode });

        if (!locker) {
            return res.status(404).json({ error: "Locker not found" });
        }

        if (new Date() > locker.expirationDate) {
            return res.status(410).json({ error: "Link Expired" });
        }

        res.json({
            title: locker.title,
            requiresPassword: !!locker.passwordHash,
            expirationDate: locker.expirationDate,
            views: locker.views,
        });
    } catch (error) {
        res.json(500).json({ error: "Server Error" });
    }
});

module.exports = router;
