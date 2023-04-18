import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { UserModel } from "../models/User.model";
import { Document } from "mongoose";

export interface AuthenticatedRequest extends Request {
  user?: {
    name: string;
    email: string;
    profilePic: string;
    verified: boolean;
    [key: string]: any; // index signature to allow any additional properties
  } & Document<typeof UserModel>;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ res: "Authorization Error" });
  }
  const token = authHeader.split(" ")[1];
  //Verifying token
  jwt.verify(
    token,
    "secret-code",
    async function (err: VerifyErrors | null, decoded: any) {
      if (err) {
        // handle JWT verification error
        return res
          .status(400)
          .send({ res: "Unauthorized User", error: "Invalid token" });
      }
      //Passing email from decoded token
      req.user = decoded;
      next();
    }
  );
};
module.exports = { verifyToken };
