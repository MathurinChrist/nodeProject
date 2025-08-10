const request = require("supertest");
const mockingoose = require("mockingoose");
const app = require("../server");
const Article = require("../api/articles/articles.schema");

describe("Tests API Articles", () => {
  const mockArticle = {
    _id: "60c72b2f9b1d4c23d8f9a123",
    title: "Article test",
    content: "Contenu de l'article de test",
    status: "draft",
    user: "60c72a6f9b1d4c23d8f9a122",
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("POST /api/articles - création article", async () => {
    mockingoose(Article).toReturn(mockArticle, "save");

    const res = await request(app)
      .post("/api/articles")
      .send({
        title: mockArticle.title,
        content: mockArticle.content,
        status: mockArticle.status,
        user: mockArticle.user,
      })
      .set("Authorization", "Bearer faketoken"); 

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(mockArticle.title);
  });

  it("PUT /api/articles/:id - mise à jour article", async () => {
    mockingoose(Article).toReturn(mockArticle, "findOneAndUpdate");

    const res = await request(app)
      .put(`/api/articles/${mockArticle._id}`)
      .send({ title: "Titre mis à jour" })
      .set("Authorization", "Bearer faketoken");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Titre mis à jour");
  });

  it("DELETE /api/articles/:id - suppression article", async () => {
    mockingoose(Article).toReturn(mockArticle, "findOneAndDelete");

    const res = await request(app)
      .delete(`/api/articles/${mockArticle._id}`)
      .set("Authorization", "Bearer faketoken");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Article supprimé");
  });
});
