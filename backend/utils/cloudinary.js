const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const path = "";

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

// Log the configuration
// {
//   cloud_name: 'dvcj0krbo',
//   api_key: '',
//   api_secret: '',
//   private_cdn: false,
//   secure_distribution: null,
//   secure: true
// }
console.log(cloudinary.config());

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const resp = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("resp.url");
    return resp;
  } catch (error) {
    console.log("Error Occured while uploading File on Cloudinary");
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFile = async (localFilePath) => {
  fs.unlinkSync(localFilePath);
};

// uploads done
module.exports = { uploadOnCloudinary, deleteFile };
