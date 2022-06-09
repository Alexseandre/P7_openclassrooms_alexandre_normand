const { Post } = require("../../db/sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.delete("/api/delete/post/:id", auth, (req, res) => {
    Post.findByPk(req.params.id).then((x) => {
      if (x === null) {
        message = "Le post n'existe pas";
        return res.status(404).json({ message });
      }

      if (x.userId != req.auth.userId && req.auth.admin != true) {
        message =
          "Vous ne pouvez pas supprimer un post qui ne vous appartient pas";
        return res.status(404).json({ message });
      }
      const PostDeleted = x;
      return Post.destroy({
        where: { postId: x.postId },
      })
        .then((_) => {
          const message = `Le Post avec l'identifiant n°${PostDeleted.postId} a bien été supprimé.`;
          res.json({ message, data: PostDeleted });
        })
        .catch((error) => {
          const message = `Le post n'a pas été trouvé, réessayer plus tard `;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
