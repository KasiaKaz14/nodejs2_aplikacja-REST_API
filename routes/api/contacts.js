import { indexContacts } from "#controllers/indexContacts.js";
import { updateContacts } from "#controllers/contacts/updateContacts.js";
import { removeContacts } from "#controllers/deleteContacts.js";
import { addNewContact } from "#controllers/contacts/createContacts.js";
import { contactById } from "#controllers/contacts/showContacts.js";
import { favouriteContacts } from "#controllers/contacts/favouriteContact.js";

import Joi from "joi";
import express from "express";

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

export { router as contactsRouter };
