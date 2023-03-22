import React, { useState } from "react";
import style from "../../pages/authenticate/auth.module.scss";
import { ImSpinner4 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { useSignupMutation } from "@/redux/apiSlice";

export interface signupUserType {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const initialState: signupUserType = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const Signup = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();

  const handleUserInfo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmpassword) {
      alert("Password not match");
    } else {
      try {
        const { res } = await signup(userInfo).unwrap();
        alert(res);
      } catch (err: any) {
        alert(err.data.res);
      }
    }
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
            htmlFor="_email"
          >
            Enter Email *
          </label>
          <input
            value={userInfo.email}
            name="email"
            onChange={handleUserInfo}
            type="email"
            id="_email"
          />
        </div>
        {/* Password */}
        <div className={style.input_container}>
          <label
            className={userInfo.password.length ? style.label_top : ""}
            htmlFor="_password"
          >
            Enter Password *
          </label>
          <input
            value={userInfo.password}
            name="password"
            onChange={handleUserInfo}
            type="password"
            id="_password"
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
          {isLoading ? <ImSpinner4 /> : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
