import axios from "axios";
import api from "./apiClient";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(
      `${api.baseUrl}/v1/upload/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.url;
  } catch (error: any) {
    throw {
      status: error.response?.status,
    };
  }
};
