import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "../config/dotenv.js";


export const login = async (req: any, res: any) => {
    try {
        const data = req.body
        const user = await UserModel.findOne({ email: data.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const compare_password = bcrypt.compareSync(data.password, user.password);
        if (!compare_password) return res.status(401).json({ message: "Invalid password" });


        const token = jwt.sign({ _id: user._id }, dotenv.ACCESS_TOKEN_SEC as string, { expiresIn: "1d" });

        return res.status(200).json({ message: "Login successful", token, role: user.role });

    } catch (e) {
        console.log(e, "ERROR IN LOGIN")
    }
}