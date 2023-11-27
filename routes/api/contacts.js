import express from "express";
import { signup } from "#controllers/newUser.js";
import { uploadAvatar } from "#controllers/user/userAvatar";
import { loginUser } from "#controllers/login";
import { authToken } from "#auth/checkToken";
import { current } from "#controllers/login";
import Joi from "joi";
import { indexContacts } from "#controllers/indexContact";
import { contactById } from "#controllers/showContacts";
import { addNewContact } from "#controllers/createContacts";
import { removeContacts } from "#controllers/deleteContacts";
import { updateContacts } from "#controllers/updateContacts";
import { favouriteContacts } from "#controllers/favouriteContact";

const router = express.Router();

export const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/contacts", indexContacts);

router.get("/:contactId", contactById);

router.post("/", addNewContact);

router.delete("/:contactId", removeContacts);

router.put("/:contactId", updateContacts);

router.patch("/api/contacts/:contactId/favorite", favouriteContacts);

router.post("/signup", signup);

router.post("/avatar", upload.single("avatar"), uploadAvatar);

router.post("/users/signup", signup);

router.post("/users/login", loginUser);

router.get("users/logout", authToken);

router.get("/users/current", current);

export { router as contactsRouter };
