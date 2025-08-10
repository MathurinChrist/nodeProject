const articleService = require("./articles.service");

class ArticleController {
  async create(req, res) {
    try {
      const data = req.body;
      data.user = req.user._id; 
      const article = await articleService.createArticle(data);

      req.app.get("io").emit("articleCreated", article);

      res.status(201).json(article);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé" });
      }
      const updatedArticle = await articleService.updateArticle(req.params.id, req.body);
      if (!updatedArticle) {
        return res.status(404).json({ message: "Article non trouvé" });
      }

      req.app.get("io").emit("articleUpdated", updatedArticle);

      res.json(updatedArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé" });
      }
      const deletedArticle = await articleService.deleteArticle(req.params.id);
      if (!deletedArticle) {
        return res.status(404).json({ message: "Article non trouvé" });
      }

      req.app.get("io").emit("articleDeleted", deletedArticle);

      res.json({ message: "Article supprimé" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new ArticleController();
