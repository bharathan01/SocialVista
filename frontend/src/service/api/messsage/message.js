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
export const getUsersChatData = async (conversationId) => {
  try {
    const responce = await API.get(`${MESSAGE.GET_CHAT}/${conversationId}`);
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
export const sendNewMessage = async (messageData) => {
  try {
    const responce = await API.post(`${MESSAGE.NEW_MESSAGE}`, messageData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
