import { Contact } from "../repositories/contacts/schema.js";

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findOne({ id: contactId });
};

const removeContact = async (contactId) => {
  return await Contact.deleteOne({ _id: contactId });
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
    upsert: false,
  });
};

const updateStatus = async (id, isFavorite) => {
  return await Contact.findOneAndUpdate(
    { _id: id },
    { $set: { favorite: isFavorite } },
    { new: true }
  );
};

export {
  addContact,
  updateContact,
  removeContact,
  getContactById,
  listContacts,
  updateStatus,
};
