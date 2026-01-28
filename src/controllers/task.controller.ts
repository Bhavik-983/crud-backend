import { Request, Response } from "express";
import { TaskModel } from "../models/task.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { io } from "../server.js";  
import constant from "../utils/constant.js";

/**
 * Admin: Create & assign task
 */
export const createTask = async (req: AuthRequest, res: Response) => {
    try {

        const { title, assigned_to } = req.body;

        const task = await TaskModel.create({
            title,
            fk_user_id: assigned_to,
        });

        io.to(assigned_to.toString()).emit("task:assigned", task);

        res.status(201).json({ message: "Task created successfully" });
    } catch (e) {
        return res.status(400).json({ message: "Task creation failed", error: e })
    }

};

// /**
//  * Admin: all tasks
//  * User: assigned tasks only
//  */
export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const filter =
            req.user.role === constant.ROLE[0]
                ? {}
                : { fk_user_id: req.user.id };

        const tasks = await TaskModel.find(filter)
            .populate("fk_user_id", "name email")

        return res.status(200).json(tasks);

    } catch (e) {

        return res.status(500).json({ message: "Task retrieval failed", error: e });
    }
};

// /**
//  * User: update status of assigned task
//  */
export const updateTaskStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
  const { task_id } = req.params;
  const { status } = req.body;

  const task = await TaskModel.findById(task_id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.fk_user_id.toString() !== req.user._id) return res.status(403).json({ message: "Not allowed" });


  task.status = status
  await task.save();

  return res.status(200).json({ message: "Task status updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Task status update failed", error: e });
  }
};
