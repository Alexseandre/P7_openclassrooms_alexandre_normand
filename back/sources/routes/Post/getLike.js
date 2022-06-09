const { Like } = require("../../db/sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.get("/api/like/:id", auth, (req, res) => {
    postId = req.params.id;
    userId = req.auth.pseudo;

    Like.findByPk(postId)
      .then((like) => {
        const dataUsers = like.dataValues.userLiked.split(",");
        if (dataUsers.includes(userId) == true) {
          const message = "Le like a bien été récupérée.";
          return res.json({ message, data: like, liked: true });
        } else {
          const message = "Le dislike a bien été récupérée.";
          return res.json({ message, data: like, liked: false });
        }
      })
      .catch((error) => {
        const message = `La liste des likes n'a pas pu être récuperée. Reassyez plus tard`;
        res.status(500).json({ message, data: error });
      });
  });
};
