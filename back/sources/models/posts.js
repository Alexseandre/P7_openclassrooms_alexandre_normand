module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Post",
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      post: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 290],
            msg: "Le contenu de votre post doit ce situer entre 2 et 290 caractères",
          },
          notEmpty: { msg: "Le message ne peut pas être vide" },
          notNull: { msg: "Votre message ne peut pas être vide" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
