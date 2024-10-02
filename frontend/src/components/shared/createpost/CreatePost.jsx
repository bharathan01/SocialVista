import React, { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { createPost } from "../../../service/api/userController/userActivity";
import Spinner from "../../common/loader/SpinnerLoader";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "../emoji/EmojiPicker";

function CreatePost({ onCloseModel }) {
  const postImage = useRef(null);
  const [postImg, setPostImg] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState(false);
  const [createPostLoader, setLoader] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);

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
    const response = await createPost(formData);
    if (response.status !== "SUCCESS") {
      setError(true);
      setLoader(false);
    } else {
      setPostImg(null);
      onCloseModel();
      setPostContent("");
      setLoader(false);
    }
  };
  const onEmojiSelect = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setPostContent(postContent + emoji);
  };
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
        <div className="flex items-start justify-center gap-3">
          <span className="text-2xl hover:cursor-pointer" onClick={() => postImage.current.click()}>
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
          <span className="text-xl hover:cursor-pointer" onClick={() => setOpenEmoji(!openEmoji)}>
            <BsEmojiSmile />
          </span>
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
      {openEmoji && (
        <div className="relative top-[-20px] md:right-[28px] right-0  ">
          <EmojiPicker onEmojiSelect={onEmojiSelect} />
        </div>
      )}
    </div>
  );
}

export default CreatePost;
