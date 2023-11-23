const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const userId = getUserIdFromToken(token);
  const user = User.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;
  next();
};

function authToken(req, res) {
  const user = req.user;

  user.token = null;
  user.save();

  res.sendStatus(204);
}

export { authToken, checkToken };
