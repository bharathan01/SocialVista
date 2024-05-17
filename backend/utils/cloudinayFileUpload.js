const {cloudinary} = require('cloudinary').v2


const uploadFiletoCloudinary = async(filePath) =>{
    return await cloudinary.uploader.upload(filePath)
}

const distroyFileFromCloudinary = async(filenaem) =>{
    return await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
}

module.exports = {
    uploadFiletoCloudinary,
    distroyFileFromCloudinary
}