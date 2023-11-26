import mongoose from "mongoose";
import { Contact } from "#schema/schema.js";

const User = mongoose.model("User", Contact);

const express = require("express");
const { Contact } = require("../schema/schema");
const app = express();

function verify(req, res) {
  const verificationToken = req.params.verificationToken;

  User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "Verification successful" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
}

export { verify };
