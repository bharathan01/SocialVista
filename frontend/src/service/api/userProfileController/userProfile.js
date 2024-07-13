import { API } from "../../../config/apiClient.js/apiClient";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

const { USER_PRO } = ApiEndPoint;

export const getUserProfileDetails = async (userId) => {
  try {
    const responce = await API.get(`${USER_PRO.USER_PROFILE}/${userId}`);
    return responce.data
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } else {
      console.log("error maessege :", errors.message);
    }
  }
};
