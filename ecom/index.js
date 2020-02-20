const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["f9ap0idwjm10299"]
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log("listening");
});

// Create user in our repo

//Store the id of the user inside the users cookie
