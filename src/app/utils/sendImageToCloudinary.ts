import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  console.log('cloudinary', imageName, path);

  // Upload an image
  const result = await cloudinary.uploader.upload(
    path,
    { public_id: imageName.trim() },
    function () {
      // delete a file asynchronously
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File is deleted.');
        }
      });
    },
  );

  return result.secure_url;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
