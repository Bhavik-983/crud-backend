import mongoose from "mongoose";
import constant from "../utils/constant.js";
import { ITask } from "../interface/task.interface.js";

const taskSchema = new mongoose.Schema<ITask>({
    title : {
        type: String,
        trim:true
    },
    status: {
        type: String,
        enum: constant.STATUS,
        default: constant.STATUS[0]
    },
    fk_user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
 

});

export const TaskModel = mongoose.model<ITask>("tasks", taskSchema);