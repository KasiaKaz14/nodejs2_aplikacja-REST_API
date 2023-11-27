import { addContact } from "#models/contact.js";
import { Contact } from "#schema/schema.js";

async function addNewContact(req, res, next) {
  const result = Contact.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.details[0].message });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
}

export { addNewContact };
