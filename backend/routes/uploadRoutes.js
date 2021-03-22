//this route is for uploading and config for multer
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

//innitializing multer storage engine and create config
//pass in object with two functions
//with destination, call the callback with null, meaning there is no error, and where we want to upload to
//with filename, pass in null for no error, and then what we want to name the file
//we dont want to use the original file name, because that might lead to duplicates if some of the files have the same name
//take the fieldname add - and the timestamp, and the node path extension can get the extension name (.jpg .png ect)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//function with calidation expression that limits what files will be able to uploaded
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  //test will give us a true or false if it matches the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //also want to check mimetype (image/jpg ect)
  const mimetype = filetypes.test(file.mimetype);

  //if both extname and mimetype pass the test, pass the cb with no error and true, else, pass the error
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

//middleware that we are going to pass to our route
//you can limit what types of files you can upload into the route with filefilter
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//this file is connected to /api/upload
//.single means we are uploading just one image
//when we call it on the front end we need to also call it image
router.post("/", upload.array("image", 16), (req, res) => {
  res.send(req.files);
});

export default router;
