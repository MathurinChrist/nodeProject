const express = require("express");
const usersController = require("./users.controller");
const router = express.Router();

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);
const usersController = require('./users.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
router.get("/:userId/articles", userController.getUserArticles.bind(userController));

router.get('/me', authMiddleware, usersController.me);

module.exports = router;


module.exports = router;
