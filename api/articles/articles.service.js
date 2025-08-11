const Article = require("../articles/articles.schema");

exports.createArticle = async (data, userId) => {
  const article = new Article({ ...data, user: userId });
  return article.save();
};

exports.getArticles = async () => {
  return Article.find({ status: "published" }).populate("user", "username");
};

exports.getArticleById = async (id) => {
  return Article.findById(id).populate("user", "username");
};

exports.updateArticle = async (id, data, userId) => {
  // On ne permet que le propriétaire de modifier
  const article = await Article.findOne({ _id: id, user: userId });
  if (!article) return null;

  Object.assign(article, data);
  return article.save();
};

exports.deleteArticle = async (id, userId) => {
  const article = await Article.findOneAndDelete({ _id: id, user: userId });
  return !!article;
};
