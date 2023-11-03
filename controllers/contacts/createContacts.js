import { addContact } from "../../models/contacts";
import { schema } from "../../routes/api/contacts";

async function addNewContact(req, res, next) {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.details[0].message });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
}

export { addNewContact };
