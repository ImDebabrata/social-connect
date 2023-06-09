import React, { useEffect, useRef, useState } from "react";
import PinInput from "./PinInput";
import style from "./otpbox.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { GrFormClose } from "react-icons/gr";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/apiSlice";
import { setOtpTimer } from "@/redux/authSlice";
import timeCounter from "../../helper/userTimer";

interface PinProps {
  length: number;
  maxLength: number;
  // setInput: React.Dispatch<React.SetStateAction<string>>;
  prop_types?: string;
  setPopupStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

const OtpBox: React.FC<PinProps> = ({
  length,
  maxLength,
  // setInput,
  prop_types = "text",
  setPopupStatus,
  isOpen,
}) => {
  const [inputBoxLength] = useState(new Array(length).fill(8));
  const [singleInputBoxValue] = useState(new Array(length).fill(""));
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [pinInput, setInput] = useState("");
  const dispatch = useAppDispatch();
  const [verifyOtp, { isError, isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isError: resendError, isLoading: resendLoading }] =
    useResendOtpMutation();
  const [timeInterval, setTimeInterval] = useState("");

  const { otpMail, otpTimer } = useAppSelector((store) => store.auth);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    singleInputBoxValue[index] = e.target.value;
    if (index !== length - 1 && e.target.value.length !== 0) {
      inputRef.current[index + 1]?.focus();
    }
    setInput(singleInputBoxValue.join(""));
  };

  const backSpaceHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index !== 0) {
      inputRef.current[index - 1]?.focus();
    }
    singleInputBoxValue[index] = e.target.value;
    setInput(singleInputBoxValue.join(""));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData
      .getData("text")
      .split("")
      .filter((_, index) => index < length);

    data.forEach((character, index) => {
      singleInputBoxValue[index] = character;
      inputRef.current[index].value = character;
      if (index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    });
    setInput(singleInputBoxValue.join(""));
  };

  const handleVerifyOtp = () => {
    verifyOtp({ otp: +pinInput, email: otpMail! })
      .unwrap()
      .then((res) => {
        alert(res.res);
        setPopupStatus(false);
      })
      .catch((err) => alert(err.data.res));
  };

  const handleResendOtp = () => {
    if (timeInterval !== "") {
      alert(`Please wait for ${timeInterval}`);
      return;
    }
    resendOtp({ email: otpMail! })
      .unwrap()
      .then((res) => {
        alert(res.res);
        dispatch(setOtpTimer(res.otpTimer));
      })
      .catch((err) => console.log(err));
  };

  const timerCallback = (intervalCountdown: string) => {
    setTimeInterval(intervalCountdown);
  };

  //Otp countdouwn timer;
  useEffect(() => {
    let callbackTimer = timeCounter(otpTimer!, timerCallback);
    return () => clearInterval(callbackTimer);
  }, [otpTimer]);

  return (
    <div
      className={`${style.otp_box} ${isOpen ? style.openOtp_box : ""}`}
      onPaste={handlePaste}
    >
      <GrFormClose onClick={() => setPopupStatus(false)} />
      <div className={style.inputbox_container}>
        {inputBoxLength.map((_, index) => {
          return (
            <PinInput
              ref={(inputElm: HTMLInputElement | null) => {
                return (inputRef.current[index] = inputElm!);
              }}
              prop_types={prop_types}
              maxLength={maxLength}
              onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeHandler(e, index)
              }
              backSpaceFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                backSpaceHandler(e, index)
              }
              key={index}
            />
          );
        })}
      </div>
      <p
        className={timeInterval !== "" ? style.disable : ""}
        onClick={handleResendOtp}
      >
        Resend OTP {timeInterval !== "" ? ` In ${timeInterval}` : ""}
      </p>
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpBox;
