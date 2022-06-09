const { Post } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.put("/api/post/update/:id", auth, (req, res) => {
    const postId = req.params.id;
    const userId = req.auth.userId;
    Post.findByPk(postId)
      .then((post) => {
        if (post === null) {
          message = "Le post n'existe pas";
          return res.status(404).json({ message });
        }
        if ((post.userId != userId) & (req.auth.admin == 0)) {
          message = "Non autorisé";
          return res.status(404).json({ message });
        } else {
          Post.update(req.body, {
            where: { postId: postId },
          }).then((_) => {
            const message = `Le Post ${postId} à bien été modifié`;
            return res.json({ message, data: req.body });
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
        const message = `Le post n'a pas pu être modifiée. Reassayez plus tard`;
        res.status(500).json({ message, data: error });
      });
  });
};
