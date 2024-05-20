const ApiError = require("./ApiError");
const { INTERNAL_SERVER_ERROR } = require("./httpStatusCodes");

const  cloudinary  = require("cloudinary").v2;

const uploadFiletoCloudinary = async (filePath) => {
  const upload = await cloudinary.uploader.upload(filePath);
  if (!upload)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "Internal server error! please try after some time!"
    );
  return upload;
};

const distroyFileFromCloudinary = async (filePath) => {
  const distroy = await cloudinary.uploader.destroy(
    filePath.split("/").pop().split(".")[0]
  );
  if (!distroy)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "Internal server error! please try after some time!"
    );
};

module.exports = {
  uploadFiletoCloudinary,
  distroyFileFromCloudinary,
};
