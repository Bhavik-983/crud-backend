import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import dotenv from "../config/dotenv.js"

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
     const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(
      token,
      dotenv.ACCESS_TOKEN_SEC
    );

    if(!decoded || typeof decoded === 'string' || !decoded._id) return res.status(401).json({ message: "Unauthorized" });

    const user = await UserModel.findOne({_id: decoded._id}).select("-password");

    if(!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
