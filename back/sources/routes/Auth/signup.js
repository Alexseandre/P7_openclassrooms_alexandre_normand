const { User } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const password = require("../../middleware/password");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const { readSync } = require("fs");

module.exports = (app) => {
  app.post("/api/auth/signup", password, (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          pseudo: req.body.pseudo,
        });
        user
          .save()
          .then(() => {
            const message = "L'utilisateur est bien enregistré.";
            res.status(200).json({ message, data: user });
          })
          .catch((error) => {
            if (error instanceof ValidationError) {
              return res
                .status(400)
                .json({ message: error, data: [error.message] });
            }
            if (error instanceof UniqueConstraintError) {
              return res
                .status(400)
                .json({ message: error, data: [error.message] });
            }
            res.status(400).json([error.message]);
          });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};
