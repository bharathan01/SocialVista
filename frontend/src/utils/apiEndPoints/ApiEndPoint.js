const BASE_URL = "http://localhost:8000/api/v1";

export const ApiEndPoint = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
  },
  POST: {
    ADD: `${BASE_URL}/post/add`,
    UPDATE: `${BASE_URL}/post/update`,
    DELETE: `${BASE_URL}/post/delete`,
    COMMENT: `${BASE_URL}/post/comment`,
    LIKE_UNLIKE: `${BASE_URL}/post/like-unlike`,
    LIKED: `${BASE_URL}/post/liked`,
  },
  COMMENT: {
    LIKE: `${BASE_URL}/comment/like`,
  },
};
