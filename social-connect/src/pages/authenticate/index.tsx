import React, { useState } from "react";
import Login from "../../components/auth/Login";
import style from "./auth.module.scss";
import Signup from "@/components/auth/Signup";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../firebase/firebaseConfig";
import { useLoginGoogleMutation } from "@/redux/apiSlice";
import { useAppDispatch } from "@/redux/typedHooks";
import { loginSuccess } from "@/redux/authSlice";

const Authenticate = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [loginGoogle, { isLoading }] = useLoginGoogleMutation();
  const dispatch = useAppDispatch();
  const handleCurrentForm = (type: string) => {
    setCurrentForm(type);
  };
  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        const { accessToken } = result.user;
        // fetching data to backend
        loginGoogle({ token: accessToken })
          .unwrap()
          .then((res) => {
            alert(res.res);
            dispatch(loginSuccess(res.token));
          })
          .catch((err) => console.log("Encountered error", err));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        alert(errorCode);
      });
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
        <button onClick={handleGoogleSignin}>
          {<FcGoogle />}
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default Authenticate;
