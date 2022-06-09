const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8, "Le minimum est de 8 caractère")
  .is()
  .max(20, "Le maximum est de 20 caractère")
  .has()
  .uppercase(1, "Le mot de passe doit contenir au minimum une majusucle")
  .has()
  .lowercase(1, "Le mot de passe doit contenir au minimum une minuscule")
  .has()
  .digits(2, "Votre mot de passe doit contenir au moins 2 chiffres")
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "azertyuiop"]);

module.exports = (req, res, next) => {
  const x = passwordSchema.validate(req.body.password, { details: true });
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    console.log(x);
    return res.status(401).json({ data: x });
  }
};
