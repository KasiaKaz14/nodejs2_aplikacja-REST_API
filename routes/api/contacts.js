import express from "express";
import { signUp } from "#controllers/signup";
import { loginUser } from "#controllers/login";
import { authToken } from "../../auth/checkToken";
import { current } from "#controllers/login";

const router = express.Router();

router.post("/users/signup", signUp);

router.post("/users/login", loginUser);

router.get("users/logout", authToken);

router.get("/users/current", current);

export { router as contactsRouter };
