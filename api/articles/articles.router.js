const express = require("express");
const router = express.Router();
const articleController = require("./articles.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, articleController.create.bind(articleController));

router.put("/:id", authMiddleware, articleController.update.bind(articleController));

router.delete("/:id", authMiddleware, articleController.delete.bind(articleController));

module.exports = router;
