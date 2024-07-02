



export const ApiEndPoint = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  POST: {
    ADD: `${import.meta.env.BASE_URL}/post/add`,
    UPDATE: `${import.meta.env.BASE_URL}/post/update`,
    DELETE: `${import.meta.env.BASE_URL}/post/delete`,
    COMMENT: `${import.meta.env.BASE_URL}/post/comment`,
    LIKE_UNLIKE: `${import.meta.env.BASE_URL}/post/like-unlike`,
    LIKED: `${import.meta.env.BASE_URL}/post/liked`,
  },
  COMMENT: {
    LIKE: `${import.meta.env.BASE_URL}/comment/like`,
  },
};
