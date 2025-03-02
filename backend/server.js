require("dotenv").config();
const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/generate", async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
        const qrCode = await QRCode.toDataURL(text);
        res.json({ qrCode });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate QR code" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
