import React, { useState } from "react";
import style from "./postbox.module.scss";
import { RiImageAddLine } from "react-icons/ri";
import "react-image-crop/src/ReactCrop.scss";
import Cropper from "../imagecropper/Cropper";
import useFirebaseImageUpload from "@/helper/useUploadFirebase";
import { FaUserCircle } from "react-icons/fa";
import { useNewPostMutation } from "@/redux/apiSlice";
const jwt = require("jsonwebtoken");
import { useAppDispatch, useAppSelector } from "@/redux/typedHooks";
import randomString from "@/helper/randomString";

const PostBox = () => {
  const { token } = useAppSelector((store) => store.auth);
  //Image file or blob file;
  const [image, setImage] = useState<null | File | Blob>(null);
  //Store image file name even change the image to bolb file after crop;
  const [fileName, setFileName] = useState<string>("");
  //create New post function
  const [newPost, { isLoading, isError }] = useNewPostMutation();
  //Post content text
  const [postText, setPostText] = useState("");
  //imgSrc for image cropping functions
  const [imgSrc, setImgSrc] = useState("");
  //Custom hooks for upload image to firebase;
  const { uploadImage, uploadProgress, error } = useFirebaseImageUpload();
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      //set file name with actual file name along with random string to avoid duplicate file names
      setFileName(e.target.files[0].name.split(".")[0] + randomString());
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  //Decoding token
  const decoded = jwt.decode(token, { complete: true });
  console.log("decoded:", decoded);
  //Callback function to get firebase file link and post to backend;
  function getDownloadUrl(url: string) {
    newPost({
      fileName,
      content: postText,
      post_image: url,
      token,
    });
  }
  //invoke function on post click
  const handlePost = () => {
    // checking for token is present and user email is present;
    if (!token && !decoded?.payload?.email) {
      return alert("Invalid user");
    }
    // checking for image is selected or not
    if (image) {
      //blob image/file image,file path,file name,callback function
      uploadImage(image!, decoded?.payload?.email, fileName, getDownloadUrl);
      // console.log(uploadProgress);
    } else {
      newPost({
        content: postText,
        token,
      });
    }
  };

  return (
    <div className={style.postbox}>
      <div className={style.post_text}>
        <div className={style.user_img}>
          {/* If profile picture available */}
          {decoded?.payload?.profilePic ? (
            <img src={decoded?.payload?.profilePic} alt="avatar" />
          ) : (
            <FaUserCircle />
          )}
        </div>
        <div className={style.user_input}>
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
      </div>
      <div className={style.post_section}>
        <div className={style.add_image}>
          <label htmlFor="addimage">
            {<RiImageAddLine />}
            <span>Image</span>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="myImage"
            id="addimage"
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
        <div className={style.post}>
          <button onClick={handlePost}>POST</button>
        </div>
      </div>
      {/* Image cropper Container */}
      {!!imgSrc && <Cropper setImage={setImage} imgSrc={imgSrc} />}
    </div>
  );
};

export default PostBox;
