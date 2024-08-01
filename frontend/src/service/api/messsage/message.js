import { API } from "../../../config/apiClient.js/apiClient";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

const { MESSAGE } = ApiEndPoint;

export const getConversations = async (userId) => {
  try {
    const responce = await API.get(`${MESSAGE.GET_CONVERSATIONS}`);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } else {
      console.log("error maessege :", error.message);
    }
  }
};
