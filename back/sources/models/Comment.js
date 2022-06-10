module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 290],
            msg: "Le contenu de votre message doit ce situer entre 2 et 290 caractères",
          },
          notEmpty: { msg: "Le message ne peut pas être vide" },
          notNull: { msg: "Votre message ne peut pas être vide" },
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
