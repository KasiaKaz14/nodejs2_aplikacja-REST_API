import bcrypt from "bcryptjs";
import { userSchema } from "../schema/schema";

function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Validation error" });
  }

  const user = userSchema.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = generateToken(user.id);
  user.token = token;
  user.save();

  return res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
}

const current = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export { loginUser, current };
