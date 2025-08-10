const Article = require("./articles.schema");

class ArticleService {
    async getArticlesByUser(userId) {
        return await Article.find({ user: userId }).populate({
            path: "user",
            select: "-password -__v -createdAt -updatedAt"
        });
    }
  async createArticle(data) {
    const article = new Article(data);
    return await article.save();
  }

  async updateArticle(id, data) {
    return await Article.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteArticle(id) {
    return await Article.findByIdAndDelete(id);
  }
}

module.exports = new ArticleService();
