const { Comment } = require("../../db/sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.get("/api/comment/:id", (req, res) => {
    postId = req.params.id;
    Comment.findAll({ where: { post_id: postId } })

      .then((Comment) => {
        console.log(Comment);
        const message = "Bien trouvé";
        res.status(200).json({ message, data: Comment });
      })
      .catch((error) => {
        const message = `La liste des Comments n'a pas pu être récuperée. Reassyez plus tard`;
        res.status(500).json({ message, data: error });
      });
  });
};
