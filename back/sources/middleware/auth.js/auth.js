const jwt = require("jsonwebtoken");
const privateKey = require("../auth.js/private_keys");
const { User } = require("../../db/sequelize");
module.exports = (req, res, next) => {
  const authorizationHeader = req.cookies.jwt;
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }
  try {
    const decodedToken = jwt.verify(authorizationHeader, privateKey);
    const userId = decodedToken.userId;
    const pseudo = decodedToken.pseudo;

    User.findByPk(userId)
      .then((user) => {
        if (user == null) {
          message = "N'existe pas";
          return res.status(404).json({ message });
        }
        if (user.admin) {
          req.auth = { userId, pseudo, admin: true };
          return next();
        } else {
          req.auth = { userId, pseudo };
          if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
          }
          next();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
