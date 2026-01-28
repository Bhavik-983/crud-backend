import { UserModel } from "../models/user.model.js";
import { Request, Response } from "express";
import constant from "../utils/constant.js";


export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find({role:{$ne:constant.ROLE[0]}}, { name: 1, _id: 1 });
        res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: "Users retrieval failed", error: e });
    }
};