const jwt = require("jsonwebtoken");
const private_keys = require("../../middleware/auth.js/private_keys");
const { User } = require("../../db/sequelize");

module.exports = (app) => {
  app.get("/api/logout", (req, res) => {
    const authorizationHeader = req.cookies.jwt;
    if (!authorizationHeader) {
      const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
      return res.status(401).json({ message });
    }
    try {
      const decodedToken = jwt.verify(authorizationHeader, private_keys);

      const userId = decodedToken.userId;
      User.findByPk(userId, {
        raw: true,
        attributes: ["pseudo", "id", "email", "createdAt"],
      }).then((user) => {
        if (user == null) {
          message = "L'utilisateur est introuvable";
          res.status(404).json({ message });
        } else {
          res.clearCookie("jwt", { path: "/" });
          res.json({ message: "Vous vous êtes bien déconnecté" });
        }
      });
    } catch {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  });
};
