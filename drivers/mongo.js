import mongoose from "mongoose";

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
