export const ApiEndPoint = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "auth/logout",
  },
  CURR_USER: {
    GET_FOLLOWING_POST: "/post/getFollowingPost",
    GET_FORYOU_POST: "/post/allPost",
    GET_LIKEUNLIKE_POST: "/post/like",
    COMMENT_POST: "/post/comment",
    NEW_POST: "/post/newPost",
    DELETE_POST: "/getUserOwnPost/deletePost",
    UPDATE_POST: "/post/updatePost",
  },
  USER_PRO: {
    USER_PROFILE: "/user/profile",
    USER_POST: "/post/userOwnPost",
    USER_LIKED_POST: "/post/likedpost",
    USER_PRO_UPDATE: "/user/profileUpdate",
    USER_SUGGECTION: "/user/suggested",
    GET_CURR_USER: "/user/getCurrentUser",
    FOLLOWUNFOLLOW: "/user/followUnfolllow",
    GET_FOLLOWERS: "/user/getFollowers",
    GET_FOLLOWING: "/user/getFollowing",
    GET_SEARCH_USER: "/user/getSearchUser",
  },
  NOTIFICATIONS: {
    GET_NOTIFICATION: "/notification",
    DELETE_NOTIFICATION: "/notification/delete",
  },
};
