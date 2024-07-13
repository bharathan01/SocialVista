import { API } from "../../../config/apiClient.js/apiClient";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

const { USER_PRO } = ApiEndPoint;

export const getUserProfileDetails = async (userId) => {
  try {
    const responce = await API.get(`${USER_PRO.USER_PROFILE}/${userId}`);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } else {
      console.log("error maessege :", errors.message);
    }
  }
};
export const getUserOwnPost = async () => {
  try {
    const responce = await API.get(USER_PRO.USER_POST);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } else {
      console.log("error maessege :", errors.message);
    }
  }
};
export const getUserLikesPosts = async () => {
  try {
    const responce = await API.get(USER_PRO.USER_LIKED_POST);
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
export const updateUserProfile = async (userId, profileData) => {
  try {
    const responce = await API.get(
      `${USER_PRO.UER_PRO_UPDATE}/${userId}`,
      profileData
    );
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
