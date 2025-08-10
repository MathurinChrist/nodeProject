const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      minlength: [3, "Le titre doit contenir au moins 3 caractères"],
    },
    content: {
      type: String,
      required: [true, "Le contenu est obligatoire"],
      minlength: [10, "Le contenu doit contenir au moins 10 caractères"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // timestamp pour les propriété createdAt et updatedAt de manière automatique
  }
);

module.exports = model("Article", articleSchema);
