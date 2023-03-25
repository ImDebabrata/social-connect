import { NextFunction, Request, Response } from "express";
const nodemailer = require("nodemailer");

// Extend the Request interface to add the custom property
declare global {
  namespace Express {
    interface Request {
      otpData?: otpData;
    }
  }
}

//Sender email Configuration
const config = {
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

export interface otpData {
  OTP: number;
  OtpExpTime: number;
}

// Generating OTP;
function generateOtp(): number {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Otp exp time from now
function getOtpExpTime(): number {
  const currentTime = new Date();
  //returning time five minutes from now
  return Number(new Date(currentTime.getTime() + 300000));
}

//Signup otp send mail middleware
const otpVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  console.log("send email middleware");

  const OTP = generateOtp();
  const OtpExpTime = getOtpExpTime();
  const otpWithExp: otpData = { OTP, OtpExpTime };
  req.body.otpData = otpWithExp;
  // send mail with defined transport object
  const message = {
    from: process.env.SENDER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Verify Your Account with a One-Time Password (OTP)", // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>OTP Verification Email</title>
      </head>
      <body>
        <p>Dear ${name},</p>
        <p>Thank you for registering with our service. To complete your registration, please enter the following One-Time Password (OTP) on our website:</p>
        <h2 style="font-size: 24px; font-weight: bold; margin-top: 10px; margin-bottom: 20px;">${OTP}</h2>
        <p>Please note that this OTP is valid for a limited time only, and you should use it immediately to avoid any delays in activating your account.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <p>Thank you for choosing our service.</p>
        <p>Sincerely,</p>
        <p>Social Connect</p>
      </body>
    </html>
    `, // html body
  };
  transporter
    .sendMail(message)
    .then(() => {
      console.log(`You should receive an email`);
      next();
    })
    .catch((err: any) => {
      return res.status(404).send({ res: "Something went wrong", error: err });
    });
};

module.exports = { otpVerification };

// const testAccount = async (req: Request, res: Response, next: NextFunction) => {
//   let testAccount = await nodemailer.createTestAccount();
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   const message = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "debabrata@hotmail.com, dddebabratadatta10@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   };

//   transporter
//     .sendMail(message)
//     .then(() => {
//       console.log(`You should receive an email`);
//       next();
//     })
//     .catch((err: any) => {
//       return res.status(404).send({ res: "Something went wrong", err });
//     });
// };
