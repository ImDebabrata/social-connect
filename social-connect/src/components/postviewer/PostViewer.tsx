import React from "react";
import style from "./postviewer.module.scss";
import { MdOutlineFavoriteBorder, MdFavorite, MdComment } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { RiCloseFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

interface postType {
  content: string;
  created_at: string;
  post_image: string;
  userId: userType;
}

interface userType {
  email: string;
  name: string;
  profilePic: string;
}

const PostViewer = ({
  content,
  created_at,
  post_image,
  userId: { email, name, profilePic },
}: postType) => {
  return (
    <div className={style.container}>
      <div className={style.options}>
        {/* <SlOptionsVertical /> */}
        <RiCloseFill />
      </div>
      <div className={style.heading}>
        <div className={style.avatar}>
          {/* Conditional rendering on the basics of profile picture */}
          {profilePic ? (
            <img src={profilePic} alt="avatar" />
          ) : (
            <FaUserCircle />
          )}
        </div>
        <div className={style.name}>{name}</div>
        <div className={style.email}>{email}</div>
      </div>
      {/* caption part */}
      <div className={style.caption}>
        <p>{content}</p>
      </div>
      {/* conditional rendering when image is available */}
      {post_image && (
        <div className={style.post_image}>
          <img src={post_image} alt="post image" />
        </div>
      )}
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
