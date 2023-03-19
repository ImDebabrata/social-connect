import React, { useState } from "react";
import style from "../../pages/authenticate/auth.module.scss";
import { ImSpinner4 } from "react-icons/im";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const Login = () => {
  const [userInfo, setUserInfo] = useState(initialState);

  const handleUserInfo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className={style["login-box"]}>
      <form onSubmit={handleFormSubmit}>
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
        {/* Submit */}
        <button className={style.submit_button} type="submit">
          {true ? <ImSpinner4 /> : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Login;
