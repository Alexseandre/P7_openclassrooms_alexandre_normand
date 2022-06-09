const { User } = require("../../db/sequelize");
// const auth = require('../auth/auth')

module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id, {
      raw: true,
      attributes: ["pseudo", "id", "email", "imageUrl", "createdAt"],
    })
      .then((user) => {
        if (user == null) {
          message = "L'utilisateur est introuvable";
          res.status(404).json({ message });
        } else {
          const message = "L'utilisateur à bien été trouvé.";
          res.json({ message, data: user });
        }
      })
      .catch((error) => {
        const message = `Le serveur a rencontré un problème veuillez réassayer plus tard  `;
        res.status(500).json({ message, data: error });
      });
  });
};
