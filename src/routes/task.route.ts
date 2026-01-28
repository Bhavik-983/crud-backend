import { Router } from "express";
import { check } from "express-validator";
import fieldValidator from "../middleware/fieldvalidator.middlware.js";
import { createTask, getTasks, updateTaskStatus } from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import constant from "../utils/constant.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.post("/create",
    authenticate,
    authorize(constant.ROLE[0]),
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("fk_user_id").notEmpty().withMessage("User ID is required").isMongoId().withMessage("Invalid user ID"),
    fieldValidator,
    createTask
)

router.get("/list", authenticate, getTasks)

router.patch("/:task_id", authenticate, authorize(constant.ROLE[0]), updateTaskStatus)


export default router;