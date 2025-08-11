const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { 
    type: String, 
    required: true, 
    minlength: [5, "Le contenu doit contenir au moins 10 caractères"] 
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
