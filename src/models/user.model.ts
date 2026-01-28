import mongoose from "mongoose";
import constant from "../utils/constant.js";
import { IUser } from "../interface/user.interface.js";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim:true
    },
    email : {
        type: String,
        trim:true
    },
    password : {
        type: String,
        trim:true
    },
    role : {
        type: String,
        enum : constant.ROLE,
        default: "USER"
    }

});

export const UserModel = mongoose.model<IUser>("users", userSchema);