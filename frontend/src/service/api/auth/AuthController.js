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
       return
    }
  }
};
export const sendGoogleLoginRequest = async (userData) => {
  try {
    const responce = await API.post(AUTH.REGISTER_LOGIN_GOOGLE, userData);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      return
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
      return
    }
  }
};


export const logOut = async () => {
  try {
    const responce = await API.get(AUTH.LOGOUT);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      return
    }
  }
};
