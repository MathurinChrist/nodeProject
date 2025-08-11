module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: "mongodb://localhost:27017/myapp",
  mongoUriTest: "mongodb://localhost:27017/myapp_test",
  secretJwtToken: "test",
};
