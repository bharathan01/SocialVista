import { API } from "../../../config/apiClient.js/apiClient.js";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";
import axios from "axios";

const { AUTH } = ApiEndPoint;

export const login = async (userData) => {
  try {
    console.log(import.meta.env.VITE_BASE_URL);
    return await API.post(AUTH.LOGIN, userData);
  } catch (error) {
    console.log(error);
  }
};

export const register = async (userData) => {
  try {
    const responce = await API.post(AUTH.REGISTER, userData);
    return responce.data
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("eeror maessege :", errors.message);
    }
  }
};
