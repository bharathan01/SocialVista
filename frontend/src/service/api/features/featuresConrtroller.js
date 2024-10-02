import axios from "axios";
import { API } from "../../../config/apiClient.js/apiClient";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

const { USER_PRO, NOTIFICATIONS, LIVE_NEWS } = ApiEndPoint;

export const getSuggection = async () => {
  try {
    const responce = await API.get(USER_PRO.USER_SUGGECTION);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const getNotications = async () => {
  try {
    const responce = await API.get(NOTIFICATIONS.GET_NOTIFICATION);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const deleteAllNotifications = async () => {
  try {
    const responce = await API.get(NOTIFICATIONS.DELETE_NOTIFICATION);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const getFollowers = async (id) => {
  try {
    const responce = await API.get(`${USER_PRO.GET_FOLLOWERS}/${id}`);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const getFollowing = async (id) => {
  try {
    const responce = await API.get(`${USER_PRO.GET_FOLLOWING}/${id}`);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const getSearchUser = async (searchUser) => {
  try {
    const responce = await API.get(USER_PRO.GET_SEARCH_USER, {
      params: {
        search: searchUser,
      },
    });
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const getLiveNews = async () => {
  const { VITE_NEWS_API } = import.meta.env;
  try {
    const responce = await axios.get(
      `${LIVE_NEWS.GET_LIVE_NEWS}&apiKey=${VITE_NEWS_API}&language=en`
    );
    return responce.data;
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (emailId) => {
  try {
    const responce = await API.post(
      USER_PRO.RESET_PASSWORD,
      { emailId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
