const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Analysis = require("./models/Analysis");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
const ML_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const sanitizeRes = await axios.post(`${ML_URL}/sanitize`, { text });

    const sanitized =
      sanitizeRes.data.sanitized_text || text;

    const entities =
      sanitizeRes.data.entities_found || [];

    const summary = `Summary: ${sanitized.slice(0, 200)}...`;

    const saved = await Analysis.create({
      sanitized_text: sanitized,
      summary,
      action_items: ["Review notes"],
      risks: ["None identified"]
    });

    res.json({
      id: saved._id,
      sanitized_text: sanitized,
      entities_found: entities,
      summary
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

app.get("/api/history", async (req, res) => {
  const items = await Analysis.find().sort({ createdAt: -1 });
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});