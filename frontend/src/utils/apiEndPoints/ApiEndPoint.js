



export const ApiEndPoint = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT:'auth/logout'
  },
  CURR_USER:{
    GET_CURR_USER: "",
    GET_FOLLOWING_POST: "/post/getFollowingPost",
    GET_FORYOU_POST: "/post/allPost",
    GET_LIKEUNLIKE_POST: "/post/like",
    COMMENT_POST: "/post/comment",
    NEW_POST: "/post/newPost",
    DELETE_POST: "/post/deletePost",
    UPDATE_POST: "/post/updatePost",
  },
  USER_PRO: {
    USER_PROFILE: "/user/profile",
    UPDATE: `${import.meta.env.BASE_URL}/post/update`,
    DELETE: `${import.meta.env.BASE_URL}/post/delete`,
    COMMENT: `${import.meta.env.BASE_URL}/post/comment`,
    LIKE_UNLIKE: `${import.meta.env.BASE_URL}/post/like-unlike`,
    LIKED: `${import.meta.env.BASE_URL}/post/liked`,
  },
};
