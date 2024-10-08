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
    } 
  }
};
export const likeUnlikePost = async (postId) => {
  try {
    const responce = await API.get(
      `${CURR_USER.GET_LIKEUNLIKE_POST}/${postId}`
    );
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const commentPost = async (postId, commentData) => {
  try {
    const responce = await API.post(
      `${CURR_USER.COMMENT_POST}/${postId}`,
      commentData
    );
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const createPost = async (postData) => {
  try {
    const responce = await API.post(CURR_USER.NEW_POST, postData, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const deletePost = async (postId) => {
  try {
    const responce = await API.post(`${CURR_USER.DELETE_POST}/${postId}`);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } 
  }
};
export const updatePost = async (postId,postData) => {
  try {
    const responce = await API.post(`${CURR_USER.UPDATE_POST}/${postId}`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    }
  }
};
