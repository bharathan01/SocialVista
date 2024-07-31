import { API } from "../../../config/apiClient.js/apiClient.js";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

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
export const loginWithGoogle = async (userData) => {
  try {
    const responce = await API.post(AUTH.REGISTER_LOGIN_GOOGLE, userData);
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


export const logOut = async () => {
  try {
    const responce = await API.get(AUTH.LOGOUT);
    return responce.data;
  } catch (error) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("eeror maessege :", errors.message);
    }
  }
};
