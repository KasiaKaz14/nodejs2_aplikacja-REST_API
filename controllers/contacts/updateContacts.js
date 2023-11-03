import { updateContact } from "../../models/contacts";
import { schema } from "../../routes/api/contacts";

async function updateContacts(req, res, next) {
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
}

export { updateContacts };
