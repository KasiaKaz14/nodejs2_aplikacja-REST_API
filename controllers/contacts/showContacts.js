import { getContactById } from "../../repositories/contacts/files.js";

async function contactById(req, res, next) {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

export { contactById };
