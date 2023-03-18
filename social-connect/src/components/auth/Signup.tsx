import React, { useState } from "react";
import style from "../../pages/authenticate/auth.module.scss";
import { ImSpinner3 } from "react-icons/im";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const Signup = () => {
  const [userInfo, setUserInfo] = useState(initialState);

  const handleUserInfo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className={style["signup-box"]}>
      <form onSubmit={handleFormSubmit}>
        {/* Name */}
        <div className={style.input_container}>
          <label
            className={userInfo.name.length ? style.label_top : ""}
            htmlFor="name"
          >
            Enter Name *
          </label>
          <input
            value={userInfo.name}
            name="name"
            onChange={handleUserInfo}
            type="text"
            id="name"
          />
        </div>
        {/* Email */}
        <div className={style.input_container}>
          <label
            className={userInfo.email.length ? style.label_top : ""}
            htmlFor="email"
          >
            Enter Email *
          </label>
          <input
            value={userInfo.email}
            name="email"
            onChange={handleUserInfo}
            type="email"
            id="email"
          />
        </div>
        {/* Password */}
        <div className={style.input_container}>
          <label
            className={userInfo.password.length ? style.label_top : ""}
            htmlFor="password"
          >
            Enter Password *
          </label>
          <input
            value={userInfo.password}
            name="password"
            onChange={handleUserInfo}
            type="password"
            id="password"
          />
        </div>
        {/* Confirm Password */}
        <div className={style.input_container}>
          <label
            className={userInfo.confirmpassword.length ? style.label_top : ""}
            htmlFor="confirmpassword"
          >
            Confirm Password *
          </label>
          <input
            value={userInfo.confirmpassword}
            name="confirmpassword"
            onChange={handleUserInfo}
            type="password"
            id="confirmpassword"
          />
        </div>
        {/* Submit */}
        <button className={style.submit_button} type="submit">
          {true ? <ImSpinner3 /> : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
