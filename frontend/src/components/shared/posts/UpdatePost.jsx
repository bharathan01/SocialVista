// import React from "react";
import React, { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { updatePost } from "../../../service/api/userController/userActivity";
import Spinner from "../../common/loader/SpinnerLoader";

function UpdatePost({ updatePostData }) {
  const postImage = useRef(null);
  const [postImg, setPostImg] = useState(null);
  const [postContent, setPostContent] = useState();
  const [error, setError] = useState(false);
  const [createPostLoader, setLoader] = useState(false);

  const postImageChange = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();
    if (file) {
      render.onload = () => {
        setPostImg(render.result);
      };
    }
    render.readAsDataURL(file);
  };
  const postContentOnChange = (e) => {
    setPostContent(e.target.value);
  };
  const createPostHandles = async () => {
    setLoader(true);
    const formData = new FormData();
    if (postImg) {
      formData.append("postImage", postImg);
    }
    if (postContent.trim() !== "") {
      formData.append("postContent", postContent);
    }
    const response = await updatePost(updatePostData._id, formData);
    if (response.status !== "SUCCESS") {
      setError(true);
      setLoader(false);
      f;
    } else {
      setPostImg(null);
      setPostContent("");
      setLoader(false);
    }
  };
  useEffect(() => {
    setPostImg(updatePostData.img);
    setPostContent(updatePostData.text);
  }, [updatePostData]);
  return (
    <div className="flex flex-col p-3 justify-center items-center gap-2 w-full">
      <div className="w-full">
        <textarea
          className="textarea textarea-ghost w-full border-none bg-gray-900"
          placeholder="Write your thoughts..."
          onChange={postContentOnChange}
          value={postContent}
          disabled={createPostLoader}
        ></textarea>
      </div>
      {postImg && ( 
        <div className="">
          <div
            onClick={() => setPostImg(null)}
            className="flex items-center w-full justify-end  "
          >
            <div className="w-[40px] h-[40px] hover:bg-gray-900 flex items-center justify-center rounded-full">
              <span className="font-bold text-2xl">x</span>
            </div>
          </div>
          <img
            src={postImg}
            alt=""
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="text-2xl" onClick={() => postImage.current.click()}>
            <CiImageOn />
          </span>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={postImage}
            onChange={(e) => postImageChange(e)}
            disabled={createPostLoader}
          />
        </div>
        <div>
          <button
            className="btn bg-[#772ba9] rounded-2xl"
            onClick={createPostHandles}
          >
            {createPostLoader ? <Spinner /> : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
