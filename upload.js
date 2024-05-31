import axios from "axios";
export const uploadCloudinary = async (file) => {
    const formData =  new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mbczgw65");
    const { data } = await axios.post("https://api.cloudinary.com/v1_1/djtaxjr3y/image/upload", formData);
    return { publicId: data?.public_id, url: data?.secure_url };
};
export const uploadCloudinaryVideo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mbczgw65"); 
      const { data } = await axios.post("https://api.cloudinary.com/v1_1/djtaxjr3y/video/upload", formData); // Use the video upload endpoint
    return { publicId: data?.public_id, url: data?.secure_url };
};