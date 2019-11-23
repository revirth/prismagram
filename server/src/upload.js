import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const uploadMiddleware = upload.single("photo");

export const uploadController = (req, res) => {
  const { file } = req;

  console.log(file);

  res.end();
};
