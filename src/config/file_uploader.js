import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import key from "./key";
import path from "path";
const fs = require("fs");

aws.config.update({
  secretAccessKey: key.S3_SECRET_KEY,
  accessKeyId: key.S3_ACCESS_KEY,
  region: key.S3_BUCKET_REGION
});

const s3 = new aws.S3();

var myBucket = key.S3_BUCKET_NAME;

export const uploadFileS3 = (filePath, key, folderName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        throw err;
      }
      console.log("Bucket Name: ", myBucket + "/" + folderName);
      params = { Bucket: myBucket + "/" + folderName, Key: key, Body: data };

      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(new Error("Image upload failed"));
        } else {
          console.log("Successfully uploaded data to myBucket/myKey");
          resolve();
        }
      });
    });
  });
};

export const uploadDirectFileS3 = (key, folderName, data) => { 
  return new Promise((resolve, reject) => {
    params = { Bucket: myBucket + "/" + folderName, Key: key, Body: data };

    console.log("Params: ", params);
    s3.upload(params, (err, data) => {
      if (err) {
        reject(new Error("Image upload failed"));
      }
      resolve(data);
    });
  });
};




// module.exports.uploadFileS3 = uploadFileS3;
// module.exports.uploadDirectFileS3 = uploadDirectFileS3;

