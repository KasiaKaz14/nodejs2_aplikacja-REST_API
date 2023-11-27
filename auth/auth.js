import express from "express";
import jwt from "jsonwebtoken";

const tokenMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, token);
      req.user = getUserFromDatabase(decoded.userId);
      if (req.user && req.user.token === token) {
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  return res.status(401).json({ message: "Not authorized" });
};

const getUserFromDatabase = (userId) => {};

const app = express();
app.use(tokenMiddleware);

app.get("/protectedRoute", (req, res) => {
  res.send("Dostęp do chronionej trasy");
});
