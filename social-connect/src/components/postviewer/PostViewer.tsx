import React from "react";
import style from "./postviewer.module.scss";
import { MdOutlineFavoriteBorder, MdFavorite, MdComment } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { RiCloseFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const PostViewer = () => {
  return (
    <div className={style.container}>
      <div className={style.options}>
        {/* <SlOptionsVertical /> */}
        <RiCloseFill />
      </div>
      <div className={style.heading}>
        <div className={style.avatar}>
          {/* <FaUserCircle /> */}
          <img
            src="https://avatars.githubusercontent.com/u/96492019?v=4"
            alt="avatar"
          />
        </div>
        <div className={style.name}>Debabrata Datta</div>
        <div className={style.email}>debabratakgt@hotmail.com</div>
      </div>
      {/* caption part */}
      <div className={style.caption}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex maiores
          molestiae aspernatur totam, nostrum accusantium earum animi,
          consectetur sint laborum dignissimos fugit eveniet aliquam dolore
          alias rerum ipsum! Autem, expedita.
        </p>
      </div>
      {/* conditional rendering when image is available */}
      <div className={style.post_image}>
        <img
          src="https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2014/10/backgrounds-portraits-6.jpg?resize=90%2C60&ssl=1"
          alt="post image"
        />
      </div>
      <div className={style.like_comment}>
        <div>
          <span>Like</span>
          <MdOutlineFavoriteBorder />
        </div>
        <div>
          <span>Comment</span>
          <MdComment />
        </div>
      </div>
    </div>
  );
};

export default PostViewer;
