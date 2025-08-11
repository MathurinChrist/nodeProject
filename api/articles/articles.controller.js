const Article = require("../articles/articles.schema");

exports.createArticle = async (req, res) => {
  try {
    const article = new Article({ ...req.body, user: req.user.userId });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.log("Erreur POST /articles:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) return res.status(404).json({ message: "Article non trouvé" });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article non trouvé" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
