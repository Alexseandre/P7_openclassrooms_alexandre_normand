module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: {
            args: [140],
            msg: "Votre commentaires ne peut dépasser les 140 caractères",
          },
          min: {
            args: [1],
            msg: "Vous ne pouvez pas poster de commentaires vide!",
          },
          notEmpty: { msg: "Le message ne peut pas être vide" },
          notNull: { msg: "Obligatoire" },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
