const { compareSync } = require("bcrypt");
const Post = require("../models/post.model.js");
const userSchema = require("../models/user.model.js");
const ApiError = require("../utils/ApiError.js");
const {
  uploadFiletoCloudinary,
  distroyFileFromCloudinary,
} = require("../utils/cloudinayFileUpload.js");
const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} = require("../utils/httpStatusCodes.js");
const tryCatch = require("../utils/tryCatch.js");
const Notification = require("../models/notification.model.js");

const getAllPost = async (req, res) => {
  const allPost = await Post.find()
    .sort({ createAt: -1 })
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments.user",
      select: "-password",
    });

  if (!allPost)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "can not fetch all post! try after sometime."
    );
  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "successfully fetch all posts",
    allPost,
  });
};

const creatNewPost = tryCatch(async (req, res) => {
  let { postImage, postContent } = req.body;
  const currentUser = req.userId;
  if (!postContent && !postImage)
    throw new ApiError(BAD_REQUEST, {
      error: "empty",
      errMsg: "Upload your post !",
    });
  if (!currentUser) throw new ApiError(UNAUTHORIZED, "unauthorized access");

  if (postImage) {
    const postUrl = await uploadFiletoCloudinary(postImage);
    postImage = postUrl.secure_url;
  }

  const newPost = new Post({
    user: currentUser,
    text: postContent,
    img: postImage,
  });

  const uploadedPost = await newPost.save();
  if (!uploadedPost)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "Can not upload your post! try after sometime"
    );

  return res.status(SUCCESS).json({
    status: "SUCCESS",
    Message: "post created successfully",
    uploadedPost,
  });
});
const getFollowingPost = tryCatch(async (req, res) => {
  const userId = req.userId;
  const userInfo = await userSchema.findById(userId);
  if (!userInfo) throw new ApiError(BAD_REQUEST, "user not found!");

  const following = userInfo.following;
  const followingUserPost = await Post.find({
    user: { $in: following },
  })
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "-password" })
    .populate({ path: "comments.user", select: "-password" });

  if (!followingUserPost)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "internal server error ,try after sometime!"
    );

  return res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "following user post",
    followingUserPost,
  });
});
const userOwnPost = tryCatch(async (req, res) => {
  const userId = req.userId;

  const postInfo = await Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments.user",
      select: "-password",
    });

  if (!postInfo)
    throw new ApiError(INTERNAL_SERVER_ERROR, "can not fetch user post!");

  res.status(SUCCESS).json({
    SUCCESS: true,
    message: "fetch user post sueccessfull",
    postInfo,
  });
});
const updatePost = tryCatch(async (req, res) => {
  let postContent = req.body?.postContent;
  let postImage = req.body?.postImage;
  const postId = req.params.id;
  const userId = req.userId;
  const postInfo = await Post.findById(postId).populate({
    path: "user",
    select: "-password",
  });
  if (!userId === postInfo.user._id.toString())
    throw new ApiError(
      BAD_REQUEST,
      "user is not authorized to update the post!"
    );

  if (postImage) {
    if (postImage != postInfo?.img) {
      if (postInfo?.img) {
        await distroyFileFromCloudinary(postInfo.img);
      }
      postImage = await uploadFiletoCloudinary(postImage);
      postInfo.img = postImage.secure_url;
    }
  } else {
    if (postInfo?.img) {
      await distroyFileFromCloudinary(postInfo.img);
      postInfo.img = undefined;
    }
  }
  if (postContent) {
    postInfo.text = postContent;
  }

  const postUpdate = await postInfo.save();
  if (!postUpdate)
    throw new ApiError(INTERNAL_SERVER_ERROR, "can not update the post!");
  return res.status(SUCCESS).json({
    SUCCESS: true,
    message: "post updated successfully",
  });
});
const deletePost = tryCatch(async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  const postInfo = await Post.findById(postId).populate({
    path: "user",
    select: "-password",
  });
  if (!userId === postInfo.user._id.toString())
    throw new ApiError(
      BAD_REQUEST,
      "user is not authorized to delete the post!"
    );
  if (postInfo.img) {
    const deleteImgCloud = await distroyFileFromCloudinary(postInfo.img);
  }
  const postDeleted = await Post.findByIdAndDelete(postId);
  if (!postDeleted)
    throw new ApiError(INTERNAL_SERVER_ERROR, "can not delete the post! 2");
  return res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "post deleted successfully",
  });
});
const likeUnlikePost = tryCatch(async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  const post = await Post.findById(postId);

  const isUserLiked = post.likes.includes(userId);
  if (isUserLiked) {
    await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
    await userSchema.updateOne(
      { _id: userId },
      { $pull: { likedPost: postId } }
    );
    const updatedLike = post.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "successfully unliked a post",
      updatedLike,
    });
  } else {
    post.likes.push(userId);
    await userSchema.updateOne(
      { _id: userId },
      { $push: { likedPost: postId } }
    );
    await post.save();
    const updatedLike = post.likes;
    const newNotification = new Notification({
      type: "like",
      from: userId,
      to: post.user,
    });

    await newNotification.save();
    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "successfully liked a post",
      updatedLike,
    });
  }
});
const likedPost = tryCatch(async (req, res) => {
  const userId = req.userId;

  const user = await userSchema.findById(userId);
  if (!user) throw new ApiError(BAD_REQUEST, "user not found!");

  const likedPosts = await Post.find({ _id: { $in: user.likedPost } })
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments.user",
      select: "-password",
    });

  res.status(SUCCESS).json({
    SUCCESS: true,
    message: "user liked post",
    likedPosts,
  });
});
const commentPost = tryCatch(async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  const { content } = req.body;

  if (!content)
    throw new ApiError(BAD_REQUEST, "Comment not be an empty string!");

  const post = await Post.findById(postId);
  if (!post) throw new ApiError(BAD_REQUEST, "Post not found!");

  const comments = {
    user: userId,
    text: content,
    time: new Date(),
  };

  post.comments.push(comments);

  await post.save();
  const newNotification = new Notification({
    type: "comment",
    from: userId,
    to: post.user,
  });

  await newNotification.save();

  return res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "commented successfully",
    post,
  });
});

// const deleteCommet = tryCatch(async(req,res) =>{

// })

module.exports = {
  getAllPost,
  creatNewPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  likedPost,
  commentPost,
  getFollowingPost,
  userOwnPost,
};
