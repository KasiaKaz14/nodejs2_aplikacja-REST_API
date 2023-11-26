import express from "express";
import multer from "multer";
import jimp from "jimp";

const app = express();
const upload = multer({ dest: "tmp/" });

app.patch("/users/avatars", upload.single("avatar"), async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const avatar = await jimp.read(req.file.path);
    await avatar.resize(250, 250);

    const avatarName = `${user.id}_${Date.now()}.${avatar.getExtension()}`;
    const avatarPath = `public/avatars/${avatarName}`;
    await avatar.writeAsync(avatarPath);

    user.avatarURL = `/avatars/${avatarName}`;

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
