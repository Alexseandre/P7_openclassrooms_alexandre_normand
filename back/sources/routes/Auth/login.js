const { User } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../../middleware/auth.js/private_keys");
const { cookie } = require("express/lib/response");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (!user) {
        const message = `L'utilisateur n'existe pas`;
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Mot de passe incorrect`;
            return res.status(401).json({ message });
          }
          const token = jwt.sign(
            { userId: user.id, pseudo: user.pseudo, imageProfil : user.imageUrl },
            privateKey,
            {
              expiresIn: "24h",
            }
          );
          const message = `L'utilisateur a été connecté avec succès`;
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          const userReturn = {
            email: user.email,
            pseudo: user.pseudo,
            id: user.id,
            création: user.createdAt,
          };
          res.status(200).json({ message, data: userReturn });
        })
        .catch((error) => {
          const message = `L'authentification a échoué `;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
