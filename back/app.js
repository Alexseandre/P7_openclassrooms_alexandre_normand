const express = require("express");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const sequelize = require("./sources/db/sequelize");
const cors = require("cors");
const cookie = require("cookie-parser");
const path = require("path");
const port = 3000;
const app = express();

// ******************************************************************
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use("/images", express.static(path.join(__dirname, "image")))
  .use(express.json())
  .use(cookie())
  .use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );

// ******************************************************************

sequelize.initDb();

// ******************************************************************
// ******************************************************************
// ***********************Users*******************************************
require("./sources/routes/Users/DeleteUser")(app);
require("./sources/routes/Users/findAllUsers")(app);
require("./sources/routes/Users/GetOneUser")(app);
require("./sources/routes/Users/UpdateUser")(app);
// ************************Post******************************************
require("./sources/routes/Post/createPost")(app);
require("./sources/routes/Post/deletePost")(app);
require("./sources/routes/Post/updatePost")(app);
require("./sources/routes/Post/getLike")(app);
require("./sources/routes/Post/GetComment")(app);
require("./sources/routes/Post/getAllPosts")(app);
require("./sources/routes/Post/likePost")(app);
require("./sources/routes/Post/CreateComment")(app);

// ***********************Auth*******************************************
require("./sources/routes/Auth/login")(app);
require("./sources/routes/Auth/getAuth")(app);
require("./sources/routes/Auth/LogOut")(app);
require("./sources/routes/Auth/signup")(app);

// ******************************************************************
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée! Essayer une autre URL";
  res.status(404).json({ message });
});

// ******************************************************************

app.listen(port, () => {
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  );
});
// ******************************************************************
