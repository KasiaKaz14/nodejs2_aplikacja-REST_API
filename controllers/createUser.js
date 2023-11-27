import dotenv from "dotenv";

dotenv.config();

export  {
  serverPort: process.env.PORT || 3000,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  jwtLifetime: process.env.JWT_LIFETIME,
  user: process.env.user,
  password: process.env.password,
};