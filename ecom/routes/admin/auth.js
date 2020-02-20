const express = require("express");
const { check, validationResult } = require("express-validator");

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
  async (req, res) => {
    const { email, password, passwordConf } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.send(signUpTemplate({ req, errors }));
    }

    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;

    res.send("Account created");
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.send(signInTemplate({ errors }));
    }

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id; //gives them cookie

    res.send(`You're signed in!`);
  }
);

module.exports = router;
