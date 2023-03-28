import React from "react";
import style from "./postbox.module.scss";
import { RiImageAddLine } from "react-icons/ri";

const PostBox = () => {
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
    </div>
  );
};

export default PostBox;
