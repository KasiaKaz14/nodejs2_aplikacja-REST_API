import { removeContact } from "../repositories/contacts/files.js";

async function removeContacts(req, res, next) {
  const { id } = req.params;
  const result = await removeContact(id);
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

export { removeContacts };
