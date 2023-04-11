import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
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
      req.body.email = decoded.email;
      next();
    }
  );
};
module.exports = { verifyToken };
