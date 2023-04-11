import React, { useState } from "react";
import style from "./postbox.module.scss";
import { RiImageAddLine } from "react-icons/ri";
import "react-image-crop/src/ReactCrop.scss";
import Cropper from "../imagecropper/Cropper";
import useFirebaseImageUpload from "@/helper/useUploadFirebase";

const PostBox = () => {
  const [image, setImage] = useState<null | File | Blob>(null);
  const [postText, setPostText] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const { uploadImage, uploadProgress, downloadURL, error } =
    useFirebaseImageUpload();
  console.log("error:", error);
  console.log("downloadURL:", downloadURL);
  console.log("uploadProgress:", uploadProgress);
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handlePost = () => {
    // checking for image is selected or not
    if (image) {
      uploadImage(image!, "datta@gmail.com/file", "checking");
      console.log(uploadProgress);
    }
    console.log(postText);
  };

  return (
    <div className={style.postbox}>
      <div className={style.post_text}>
        <div className={style.user_img}></div>
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
