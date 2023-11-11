import mongoose from "mongoose";

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

export { contactSchema };
