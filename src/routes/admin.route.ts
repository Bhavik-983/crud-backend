import { Router } from "express";
import { getUsers } from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import constant from "../utils/constant.js";

const router = Router();

router.get("/users", authenticate, authorize(constant.ROLE[0]), getUsers);

export default router;