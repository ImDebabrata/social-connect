import React, { useState } from "react";
import Login from "../../components/auth/Login";
import style from "./auth.module.scss";
import Signup from "@/components/auth/Signup";
import { FcGoogle } from "react-icons/fc";

const Authenticate = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const handleCurrentForm = (type: string) => {
    setCurrentForm(type);
  };
  return (
    <div
      className={`${style.container} ${
        currentForm === "signup" ? style.container_signup : ""
      }`}
    >
      <div className={style.form_container}>
        <div
          className={`${style.slider} ${
            currentForm === "signup" ? style.moveslider : ""
          }`}
        ></div>
        <div className={style.switch_button_container}>
          <button
            onClick={() => handleCurrentForm("login")}
            className={style.login_switch}
          >
            Login
          </button>
          <button
            onClick={() => handleCurrentForm("signup")}
            className={style.signup_switch}
          >
            Signup
          </button>
        </div>

        {/* <!-- Form section that contains the
             login and the signup form --> */}
        <div
          className={`${style["form-section"]} ${
            currentForm === "signup" ? style["form-section-move"] : ""
          }`}
        >
          {/* <!-- login form --> */}
          <Login />
          {/* <!-- signup form --> */}
          <Signup />
        </div>
      </div>
      <div
        className={`${style.side_bar} ${
          currentForm === "signup" ? style.side_bar_move : ""
        }`}
      >
        <p>Connecting you to the world, one post at a time</p>
        <span>Continue with</span>
        <button>
          {<FcGoogle />}
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default Authenticate;
