import fs from "fs";
import path from "path";
import mongoose from "mongoose";
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

mongoose.connect("mongodb://localhost:27017/contacts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Database connection successful");
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

Contact.find()
  .then((contacts) => {
    console.log("Contacts:", contacts);
  })
  .catch((err) => {
    console.error("Error retrieving contacts:", err);
  });

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
