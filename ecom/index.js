const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`
 <div>
 <form method="POST">
 <input name="email" placeholder="email"/>
 <input name="password" placeholder="Password"/>
 <input name="passconf" placeholder="Confirm Password"/>
 <button>Sign Up</button> 
 </form>
 </div> 
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passconf } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email already exists");
  }

  if (passconf != password) {
    return res.send("Passwords must match");
  }

  getOneBy(req.email);
  console.log(req.body);
  res.send("Account created");
});

app.listen(3000, () => {
  console.log("listening");
});
