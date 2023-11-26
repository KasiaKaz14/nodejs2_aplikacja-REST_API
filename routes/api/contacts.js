import express from "express";
import { verify } from "#controllers/verify.js";
import { sendUserVerificationMail } from "#controllers/user.service.js";

const router = express.Router();

router.get("/users/verify/:verificationToken", verify);

router.post("/users/verify", sendUserVerificationMail);

export { router as contactsRouter };
