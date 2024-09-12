const userModel = require("../models/user");
const { v4: uuid } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });
  console.log(`user: ${user}`);
  if (!user) {
    console.log("invalid");
    return res.render("login", {
      error: `invalid user `,
    });
  }

  const sessionId = uuid();
  setUser(sessionId, user);

  res.cookie("uid", sessionId);
  return res.redirect("/");
}

async function handleUserSignup(req, res) {
  const { fullname, email, password } = req.body;
  await userModel.create({
    fullname,
    email,
    password,
  });

  return res.redirect("/login");
}

module.exports = {
  handleUserLogin,
  handleUserSignup,
};
