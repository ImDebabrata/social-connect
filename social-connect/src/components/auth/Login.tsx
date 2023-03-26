import React, { useState } from "react";
import style from "../../pages/authenticate/auth.module.scss";
import { ImSpinner4 } from "react-icons/im";
import { useLoginMutation } from "@/redux/apiSlice";
import { loginSuccess, setOtpMail } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/typedHooks";
import Popup from "../popup/Popup";
import OtpBox from "../otpbox/OtpBox";

export interface loginUserType {
  email: string;
  password: string;
}

const initialState: loginUserType = {
  email: "",
  password: "",
};

const Login = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [popupStatus, setPopupStatus] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleUserInfo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(userInfo)
      .unwrap()
      .then((res) => {
        alert(res.res);
        dispatch(loginSuccess(res.token));
      })
      .catch((err) => {
        if (err?.data?.res) {
          alert(err.data.res);
          dispatch(setOtpMail(err.data.email));
          setPopupStatus(true);
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <>
      <Popup isOpen={popupStatus}>
        <OtpBox
          length={4}
          maxLength={1}
          setPopupStatus={setPopupStatus}
          isOpen={popupStatus}
        />
      </Popup>
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
            {isLoading ? <ImSpinner4 /> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
