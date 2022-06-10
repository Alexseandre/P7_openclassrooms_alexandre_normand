const { Sequelize, DataTypes } = require("sequelize");
// *******************************************
const PostModel = require("../models/posts");
const UserModel = require("../models/user");
const CommentModel = require("../models/Comment.js");
const LikeModel = require("../models/Like");
// *******************************************
const bcrypt = require("bcrypt");
// *******************************************
const usersMock = require("./mock-users");
const PostMock = require("../db/mock-post");
// *******************************************
const sequelize = new Sequelize("p7-alex-tryass", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

// *******************************************
const Comment = CommentModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const Like = LikeModel(sequelize, DataTypes);
// *******************************************
User.hasMany(Post, { foreignKey: "user_id", onDelete: "CASCADE" });
Post.belongsTo(User, { as: "user", foreignKey: "user_id" });
Post.hasMany(Like, { foreignKey: "post_id", as: "Like", onDelete: "CASCADE" });
Post.hasMany(Comment, {
  foreignKey: "post_id",
  as: "Comment",
  onDelete: "CASCADE",
});

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    usersMock.map((user) => {
      bcrypt.hash(user.password, 10).then((hash) => {
        User.create({ email: user.email, password: hash, pseudo: user.pseudo });
        // .then(user => console.log(user.toJSON()))
      });
    });
    PostMock.map((x) => {
      Post.create({
        post: x.post,
        userId: x.userId,
      }).then((x) => {
        Like.create({
          userLiked: [],
          postId: x.postId,
          like: 0,
        });
      });
      // .then(x => console.log(x.toJSON()))
    });

    console.log("Les modèles on tous été syncro!");
  });
};
// *******************************************
module.exports = {
  initDb,
  User,
  Post,
  Comment,
  Like,
};
