import express from "express";
import Joi from "joi";
const router = express.Router();

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.details[0].message });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const contactDetails = schema.validate(req.body);
  if (contactDetails.error) {
    res.status(400).json({ message: contactDetails.error.details[0].message });
  } else {
    const updatedContact = await updateContact(id, { contactDetails });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

export { router };
