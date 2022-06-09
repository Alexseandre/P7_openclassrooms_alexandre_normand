const { Post } = require("../../db/sequelize");
const { Op, Sequelize } = require("sequelize");
const auth = require("../../middleware/auth.js/auth");

module.exports = (app) => {
  app.get("/api/posts", (req, res) => {
    const limit = parseInt(req.query.limit) || 15;
    Post.findAll({
      order: [["postId", "DESC"]],
      limit: limit,
      raw: true,
      // include: ["comment"],
    })
      .then((users) => {
        const message = "La liste des posts a bien été récupérée.";
        res.json({ message, data: users });
      })
      .catch((error) => {
        const message = `La liste des users n'a pas pu être récuperée. Reassyez plus tard`;
        res.status(500).json({ message, data: error });
      });
  });
};
