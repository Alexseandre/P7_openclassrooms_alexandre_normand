const { isEmail } = require("validator");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue:
        "https://imgs.search.brave.com/KbRNVWFimWUnThr3tB08-RFa0i7K1uc-zlK6KQedwUU/rs:fit:860:752:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI0LTI0/ODI1M191c2VyLXBy/b2ZpbGUtZGVmYXVs/dC1pbWFnZS1wbmct/Y2xpcGFydC1wbmct/ZG93bmxvYWQucG5n",
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Veuillez fournir une adrese email valide",
        },
      },
      unique: {
        msg: "Cette adresse email est déjà utilisé",
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-z]+$", "i"],
          msg: "Votre pseudo ne doit contenir que des lettres.",
        },
        len: {
          args: [3, 12],
          msg: "Votre pseudo doit être contenu entre 1 et 10",
        },
        notEmpty: { msg: "Le pseudo ne peut pas être vide" },
        notNull: { msg: "Votre Pseudo ne peut pas être vide" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
