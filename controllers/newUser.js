import gravatar from "gravatar";
import express from "express";

const app = express();
app.use(express.json());

function signup(req, res) {
  const { email, password } = req.body;

  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "404" });

  const newUser = {
    email,
    password,
    avatarURL,
  };

  res.json(newUser);
}

export { signup };
