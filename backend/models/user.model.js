const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength:6
    },
    profileImg: {
      type: String,
      default: "",
    },
    coverImg: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    // likedPost: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Post",
    //   default: [],
    // },
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: []
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:[]
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User",userSchema);
