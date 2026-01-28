import { UserModel } from "../models/user.model.js";
import { Request, Response } from "express";


export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}, { name: 1, _id: 1 });
        res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: "Users retrieval failed", error: e });
    }
};