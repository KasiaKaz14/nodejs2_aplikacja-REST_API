import { indexContacts } from "../../controllers/indexContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
import { removeContacts } from "../../controllers/deleteContacts.js";
import { addNewContact } from "../../controllers/contacts/createContacts.js";
import { contactById } from "../../controllers/contacts/showContacts.js";

import express from "express";
import Joi from "joi";
const router = express.Router();

export const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", indexContacts);

router.get("/:contactId", contactById);

router.post("/", addNewContact);

router.delete("/:contactId", removeContacts);

router.put("/:contactId", updateContacts);

export { router };
