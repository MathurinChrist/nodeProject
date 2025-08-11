const express = require("express");
const userController = require("./users.controller");
const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

const authMiddleware = require('../../middlewares/auth.js');
router.get("/:userId/articles", userController.getUserArticles);

router.get('/me', authMiddleware, userController.me);

module.exports = router;


module.exports = router;
