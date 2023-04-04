import React from "react";
import style from "./postviewer.module.scss";
import { MdOutlineFavoriteBorder, MdFavorite, MdComment } from "react-icons/md";

const PostViewer = () => {
  return (
    <div className={style.container}>
      <div className="options"></div>
      <div className={style.heading}>
        <div className={style.avatar}></div>
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
      <div className={style.post_image}></div>
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
