import multer from "multer";

const publicPath = path.join(__dirname, "public");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(publicPath, "avatars"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(express.static(publicPath));

app.post("/upload", upload.single("avatar"), (req, res) => {
  res.send("Avatar has been succesfully uploaded");
});
