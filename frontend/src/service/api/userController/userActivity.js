import { API } from "../../../config/apiClient.js/apiClient.js";
import { ApiEndPoint } from "../../../utils/apiEndPoints/ApiEndPoint";

const { CURR_USER } = ApiEndPoint;

export const getFollowingPost = async () => {
  try {
    const responce = await API.get(CURR_USER.GET_FOLLOWING_POST);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("error maessege :", errors.message);
    }
  }
};
export const getForYouPost = async () => {
  try {
    const responce = await API.get(CURR_USER.GET_FORYOU_POST);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("error maessege :", errors.message);
    }
  }
};
export const likeUnlikePost = async (postId) => {
  console.log(`CURR_USER.GET_LIKEUNLIKE_POST/${postId}`)
  try {
    const responce = await API.get(`${CURR_USER.GET_LIKEUNLIKE_POST}/${postId}`);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      console.log("error maessege :", errors.message);
    }
  }
};