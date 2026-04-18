import cloudinary from "../utils/cloudinary.js";

const imageUpload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });

    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Image upload failed");
  }
};

export default imageUpload;
