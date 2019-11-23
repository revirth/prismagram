require("dotenv-expand")(require("dotenv").config());
import multer from "multer";
const ImgurStorage = require("@trevorblades/multer-storage-imgur");

const upload = multer({
  dest: "uploads/",
  storage: ImgurStorage({
    albumId: `${process.env.IMGUR_ALBUM_ID}`, // TODO: change other storage, albumId doesn't work :/
    clientId: `${process.env.IMGUR_CLIENT_ID}`
  })
});

export const uploadMiddleware = upload.single("photo");

export const uploadController = (req, res) => {
  const { file } = req;

  console.log(file);

  res.json(file.data);
};
