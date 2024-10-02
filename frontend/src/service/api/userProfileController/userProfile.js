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
    } 
  }
};
export const getCurrentUser = async () => {
  try {
    const responce = await API.get(USER_PRO.GET_CURR_USER);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } 
  }
};
export const getUserOwnPost = async (id) => {
  try {
    const responce = await API.get(`${USER_PRO.USER_POST}/${id}`);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } 
  }
};
export const getUserLikesPosts = async (id) => {
  try {
    const responce = await API.get(`${USER_PRO.USER_LIKED_POST}/${id}`);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } 
  }
};
export const updateUserProfile = async (userId, profileData) => {
  try {
    const responce = await API.post(
      `${USER_PRO.USER_PRO_UPDATE}/${userId}`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response;
      return error;
    }
  }
};
export const followUnfollow = async (id) => {
  try {
    const responce = await API.post(`${USER_PRO.FOLLOWUNFOLLOW}/${id}`);
    return responce.data;
  } catch (error) {
    if (error.response) {
      const error = error?.response?.data;
      return error;
    } 
  }
};