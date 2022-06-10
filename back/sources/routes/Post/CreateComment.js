const { Comment } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const multer = require("../../middleware/multer-config");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.post("/api/create/comment/:id", auth, multer, (req, res) => {
    console.log(req.body);
    console.log(req.auth);
    if (req.body.content == "undefined") {
      req.body.content = null;
    }
    const commentData = {
      post_id: req.params.id,
      userId: req.auth.userId,
      user_id: req.auth.userId,
      comment: req.body.comment,
      pseudo: req.auth.pseudo,
    };
    Comment.create(commentData)
      .then((comment) => {
        res.json({ message: "Commentaire bien envoyé", data: comment });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le post n'a pas pu être ajoutée. Réessayez plus tard`;
        res.status(500).json({ message, data: error });
      });
  });
};
