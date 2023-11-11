import { listContacts } from "../repositories/contacts/files.js";

async function indexContacts(req, res, next) {
  const contacts = await listContacts();
  res.status(200).json(contacts);
}
export { indexContacts };
