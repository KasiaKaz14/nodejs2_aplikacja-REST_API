import bcrypt from "bcryptjs";
import { Contact } from "#schema/schema.js";

function signUp(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Validation error" });
  }

  const user = Contact.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
  });
  newUser.save();

  return res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
}

export { signUp };
