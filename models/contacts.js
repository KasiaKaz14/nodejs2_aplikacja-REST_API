const fs = require("fs");
const contactsPath = join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await readFile(contactsPath, "utf-8");
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
  await writeFile(contactsPath, JSON.stringify(updatedContacts));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: contacts.id, ...body };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContact = { contactId, ...body };
  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? updatedContact : contact
  );
  await writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
