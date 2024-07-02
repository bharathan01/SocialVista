import { API } from "../../../config/apiClient.js/apiClient.js";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";
import axios from "axios";

const { AUTH } = ApiEndPoint;

export const login = async (userData) => {
  try {
    const responce = await API.post(AUTH.LOGIN, userData);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("eeror maessege :", errors.message);
    }
  }
};

export const register = async (userData) => {
  try {
    const responce = await API.post(AUTH.REGISTER, userData);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("eeror maessege :", errors.message);
    }
  }
};
