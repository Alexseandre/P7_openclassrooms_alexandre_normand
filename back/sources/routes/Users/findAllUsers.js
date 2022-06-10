const { User } = require("../../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    if (req.query.pseudo) {
      const pseudo = req.query.pseudo;
      if (pseudo.length < 2) {
        const message =
          "Le terme de recherche doit contenir au moins 2 caractères. ";
        return res.status(400).json({ message });
      }
      const limit = parseInt(req.query.limit) || 15;
      return User.findAndCountAll({
        where: {
          // 'pseudo' est la propriété du modèle
          pseudo: {
            [Op.like]: `%${pseudo}%`, // 'pseudo' est le critère de la recherche
          },
        },
        order: ["pseudo"],
        limit: limit,
        raw: true,
        attributes: ["pseudo", "id", "imageUrl", "createdAt", "email", "admin"],
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} users qui correspondent au terme de recherche ${pseudo}`;
        return res.json({ message, data: rows });
      });
    } else {
      User.findAll({
        order: ["pseudo"],
        raw: true,
        attributes: ["pseudo", "id", "imageUrl", "createdAt", "email", "admin"],
      })
        .then((users) => {
          const message = "La liste des users a bien été récupérée.";
          return res.json({ message, data: users });
        })
        .catch((error) => {
          const message = `La liste des users n'a pas pu être récuperée. Reassyez plus tard`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
