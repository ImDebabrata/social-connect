import React, { useState } from "react";
import style from "./postbox.module.scss";
import { RiImageAddLine } from "react-icons/ri";
import "react-image-crop/src/ReactCrop.scss";
import Cropper from "../imagecropper/Cropper";

const PostBox = () => {
  const [imgSrc, setImgSrc] = useState("");
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className={style.postbox}>
      <div className={style.post_text}>
        <div className={style.user_img}></div>
        <div className={style.user_input}>
          <input type="text" />
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
          <button>POST</button>
        </div>
      </div>
      {/* Image cropper Container */}
      {!!imgSrc && <Cropper imgSrc={imgSrc} />}
    </div>
  );
};

export default PostBox;
