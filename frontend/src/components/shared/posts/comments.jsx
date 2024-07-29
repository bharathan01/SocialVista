import React, { useEffect } from "react";
import profileImage from "../../../../public/images/avatar-placeholder.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { relativeTimeString } from "../../../utils/date/DateAndTime";

function comments({ comments, isCommentSuccess }) {
  useEffect(() => {}, [isCommentSuccess]);
  return comments.length <= 0 ? (
    <div className="text-center opacity-60">No comments</div>
  ) : (
    comments
      .slice()
      .reverse()
      .map((comment, index) => {
        return (
          <React.Fragment key={index}>
            <div className="flex gap-2 flex-col justify-between">
              <div className="flex gap-3">
                <div className="w-[30px] h-[30px] min-w-[30px] rounded-full ">
                  {comment.user.profileImg ? (
                    <img
                      src={comment.user.profileImg}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img src={profileImage} alt="" />
                  )}
                </div>
                <div>
                  <span className="text-base">{comment.user.username}</span>
                  <span className="text-sm opacity-70 ml-2">
                    {relativeTimeString(comment.time)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full flex justify-center">
                  <div className="w-[90%]  outline-none">
                    <span className="md:text-sm text-xs">{comment.text}</span>
                  </div>
                </div>
                <div className="text-center">
                  <IoIosHeartEmpty />
                  <span className="text-xs ">1</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })
  );
}

export default comments;
