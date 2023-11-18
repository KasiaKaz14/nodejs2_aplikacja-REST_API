import { listContacts } from "#models/contact.js";

function updateStatusContact(contactId, favorite) {
  const contact = listContacts.find((c) => c.contactId === contactId);

  if (!contact) {
    return { message: "Not found" };
  }

  contact.favorite = favorite;

  return contact;
}

async function favouriteContacts(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = updateStatusContact(parseInt(contactId), favorite);

  if (updatedContact.message === "Not found") {
    return res.status(404).json(updatedContact);
  }

  return res.status(200).json(updatedContact);
}

export { favouriteContacts };
