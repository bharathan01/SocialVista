
import { API } from "../../../config/apiClient.js/apiClient";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";
import axios from "axios";

const { AUTH } = ApiEndPoint;
const { VITE_BASE_URL } = import.meta.env;

export const login = async (userData) => {
  try {
    console.log(import.meta.env.VITE_BASE_URL);
    return API.post(AUTH.LOGIN, userData);
  } catch (error) {
    console.log(error);
  }
};
export const register = async (userData) => {
  try {
    return await axios.post(VITE_BASE_URL+AUTH.REGISTER, userData);
  } catch (error) {
    console.log(error.message);
  }
};
