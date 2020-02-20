const express = require("express");
const { handleErrors } = require("./middleware");

const usersRepo = require("../../repositories/users");
const signUpTemplate = require("../../views/admin/auth/signup.js");
const signInTemplate = require("../../views/admin/auth/signin.js");
const {
  requireEmail,
  requirePassword,
  requirePasswordMatch,
  requireEmailExists,
  requireCorrectPassword
} = require("./validators.js");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordMatch],
  handleErrors(signUpTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;

    res.redirect("/admin/products");
  }
);

router.get("/signout", async (req, res) => {
  req.session = null;
  res.send(`You're logged out`);
});

router.get("/signin", async (req, res) => {
  res.send(signInTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireCorrectPassword],
  handleErrors(signInTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id; //gives them cookie

    res.redirect("/admin/products");
  }
);

module.exports = router;
