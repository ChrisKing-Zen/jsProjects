const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");
const cookieSession = require("cookie-session");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["f9ap0idwjm10299"]
  })
);
app.get("/signup", (req, res) => {
  res.send(`
 <div>
 Your id is: ${req.session.userId}
 <form method="POST">
 <input name="email" placeholder="email"/>
 <input name="password" placeholder="Password"/>
 <input name="passconf" placeholder="Confirm Password"/>
 <button>Sign Up</button> 
 </form>
 </div> 
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passconf } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email already exists");
  }

  if (passconf !== password) {
    return res.send("Passwords must match");
  }

  //review code starting here

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send("Account created");
});

app.get("/signout", async (req, res) => {
  req.session = null;
  res.send(`You're logged out`);
});

app.get("/signin", async (req, res) => {
  res.send(`
<div>
 <form method="POST">
 <input name="email" placeholder="email"/>
 <input name="password" placeholder="Password"/>
 <button>Sign In</button> 
 </form>
 </div> 
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email doesn't exist");
  }

  if (user.password !== password) {
    return res.send("incorrect password");
  }

  req.session.userId = user.id; //gives them cookie

  res.send(`You're signed in!`);
});
app.listen(3000, () => {
  console.log("listening");
});

// Create user in our repo

//Store the id of the user inside the users cookie
