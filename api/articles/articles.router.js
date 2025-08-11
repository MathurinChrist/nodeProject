const express = require("express");
const router = express.Router();
const articlesController = require("./articles.controller")
const authMiddleware = require("../../middlewares/auth");

router.use(authMiddleware);

router.post("/", authMiddleware, articlesController.createArticle);

router.get("/", authMiddleware, articlesController.getPublishedArticles);

router.get("/:id", authMiddleware, articlesController.getArticleById);

router.put("/:id", authMiddleware, articlesController.updateArticle);

router.delete("/:id", authMiddleware, articlesController.deleteArticle);

module.exports = router;
