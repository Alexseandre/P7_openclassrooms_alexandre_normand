const { User } = require("../../db/sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.delete("/api/delete/user", auth, (req, res) => {
    const id = req.auth.userId;
    User.findByPk(id).then((x) => {
      if (x === null) {
        message = "L'utilisateur n'existe pas";
        return res.status(404).json({ message });
      }
      if (x.id != req.auth.userId) {
        message =
          "Vous ne pouvez pas supprimer un compte qui ne vous appartient pas";
        return res.status(404).json({ message });
      }
      return User.destroy({
        where: { id: x.id },
      })
        .then((_) => {
          const message = `Le compte  a bien été supprimé.`;
          // res.clearCookie("jwt", { path: "/" });
          res.json({ message });
        })
        .catch((error) => {
          const message = `Le compte n'a pas été trouvé, réessayer plus tard `;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
