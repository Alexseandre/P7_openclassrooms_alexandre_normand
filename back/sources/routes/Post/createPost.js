const { Post } = require("../../db/sequelize");
const { Like } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const multer = require("../../middleware/multer-config");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.post("/api/create/post", auth, multer, (req, res) => {
    if (req.body.post == "undefined") {
      req.body.post = null;
    }

    const postData = req.file
      ? {
          post: req.body.post,
          userId: req.auth.userId,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : {
          post: req.body.post,
          user_id: req.auth.userId,
          userId: req.auth.userId,
          imageUrl: "",
        };
    Post.create(postData)
      .then((post) => {
        const message = `Le post : "${req.body.post}" a bien été envoyé.`;
        dataPost = post;
        res.json({ message, data: post });
      })
      .then((x) => {
        Like.create({
          userLiked: [],
          postId: dataPost.postId,
          post_id: dataPost.postId,
          like: 0,
          user_id: req.auth.userId,
        });
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
