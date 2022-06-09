const { User } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../middleware/auth.js/auth");
const multer = require("../../middleware/multer-config");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.put("/api/update/profil", auth, multer, (req, res) => {
    const userId = req.auth.userId;
    User.findByPk(userId)
      .then((user) => {
        const imageUrl = req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : user.imageUrl;
        const password = req.body.password ? req.body.password : user.password;
        const email = req.body.email ? req.body.email : user.email;
        if (user === null) {
          message = "Utilisateur non trouvé";
          return res.status(404).json({ message });
        } else {
          User.update(
            {
              email,
              id: userId,
              password,
              imageUrl,
            },
            {
              where: { id: userId },
            }
          )
            .then((_) => {
              const message = `Vos informations ont bien été modifié`;
              return res.json({ message, data: req.body.email });
            })
            .catch((err) => {
              return res.status(400).json({ message: err.message, data: err });
            });
        }
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Problème serveur`;
        res.status(500).json({ message, data: error });
      });
  });
};
