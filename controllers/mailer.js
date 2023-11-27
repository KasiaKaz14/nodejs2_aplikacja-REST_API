import nodemailer from "nodemailer";
import { user, password } from "./createUser.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    password: password,
  },
});

const sendMail = async (options) => {
  try {
    await transporter.sendMail(options);
  } catch (e) {
    console.error(e);
    throw new Error("Mail sending failed!");
  }
};

export { sendMail };
