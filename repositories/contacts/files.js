import fs from "fs";
import path from "path";

const contactsPath = path.join(process.cwd(), "/routes/api/db/contacts.json");

const listContacts = async () => {
  const data = fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: contacts.id, ...body };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContact = { contactId, ...body };
  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? updatedContact : contact
  );
  fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContact;
};

export {
  addContact,
  updateContact,
  removeContact,
  getContactById,
  listContacts,
};
