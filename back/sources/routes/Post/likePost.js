const { Like } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.put("/api/like", auth, (req, res) => {
    const postId = req.body.postId;
    const userId = req.auth.pseudo;

    Like.findByPk(postId)
      .then((like) => {
        if (like == null) {
          message = "Le post n'existe plus";
          return res.status(404).json({ message });
        }
        const dataUsers = like.dataValues.userLiked.split(",");
        if (dataUsers.includes(userId) == true) {
          const dataUsersCut = dataUsers.filter((user) => user !== userId);
          const dataLike = {
            userLiked: dataUsersCut,
            postId: postId,
            like: like.dataValues.like - 1,
          };
          Like.update(dataLike, {
            where: { postId: postId },
          }).then((_) => {
            const message = `La demande à bien été pris en compte`;
            return res.json({ message, data: dataLike });
          });
        } else {
          dataUsers.push(userId);
          const dataLike = {
            userLiked: dataUsers,
            postId: postId,
            like: like.dataValues.like + 1,
          };
          Like.update(dataLike, {
            where: { postId: postId },
          }).then((_) => {
            const message = `La demande à bien été pris en compte`;
            return res.status(200).json({ message, data: dataLike });
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
