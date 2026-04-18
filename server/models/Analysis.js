const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    sanitized_text: { type: String, required: true },
    summary: { type: String, required: true },
    action_items: [{ type: String }],
    risks: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);