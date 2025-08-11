const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { server } = require("../../../server");
const Article = require("../articles.schema");
const User = require("../../users/users.model");
const jwt = require("jsonwebtoken");
const config = require("../../../config/index");

mongoose.set('strictQuery', false); // pour éviter le warning mongoose

let token;
let userId;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Création d’un utilisateur fictif
  const user = new User({ username: "testuser", email: "test@test.com", password: "12345678" });
  await user.save();
  userId = user._id;

  // Génération du token JWT
  token = jwt.sign({ userId: user._id, role: "user" }, config.secretJwtToken, { expiresIn: "1h" });
});

afterEach(async () => {
  await Article.deleteMany();
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

describe("Articles API", () => {
  test("POST /articles - crée un article", async () => {
    const data = {
      title: "Mon premier article",
      content: "Ceci est le contenu de l'article qui est assez long.mathurin",
      status: "draft",
    };

    const res = await request(server)
      .post("/articles")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe(data.title);
    expect(res.body.user).toBe(String(userId));
  });

  test("GET /articles - récupère les articles publiés", async () => {
    // Crée 2 articles en BDD
    await Article.create([
      { title: "Publi", content: "Contenu publi", status: "published", user: userId },
      { title: "Brouillon", content: "Ceci est le contenu de l'article qui est assez long.mathurin", status: "draft", user: userId },
    ]);

    const res = await request(server)
      .get("/articles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].status).toBe("published");
  });

  test("GET /articles/:id - récupère un article par ID", async () => {
    const article = await Article.create({
      title: "Article test",
      content: "Ceci est le contenu de l'article qui est assez long.mathurin",
      status: "published",
      user: userId,
    });

    const res = await request(server)
      .get(`/articles/${article._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(article.title);
  });

  test("PUT /articles/:id - modifie un article", async () => {
    const article = await Article.create({
      title: "Article à modifier",
      content: "Ceci est le contenu de l'article qui est assez long.mathurin",
      status: "draft",
      user: userId,
    });

    const newContent = { content: "Ceci est le contenu de l'article qui est assez long.mathurin" };

    const res = await request(server)
      .put(`/articles/${article._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newContent);

    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe(newContent.content);
  });

  test("DELETE /articles/:id - supprime un article", async () => {
    const article = await Article.create({
      title: "Article à supprimer",
      content: "Ceci est le contenu de l'article qui est assez long.mathurin",
      status: "draft",
      user: userId,
    });

    const res = await request(server)
      .delete(`/articles/${article._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);

    const check = await Article.findById(article._id);
    expect(check).toBeNull();
  });
});
