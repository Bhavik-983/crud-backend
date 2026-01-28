import express from "express"
import authRouter from "./auth.route.js"
import taskRouter from "./task.route.js"
import adminRouter from "./admin.route.js"

const router = express.Router()


router.use("/auth" , authRouter)
router.use("/task" , taskRouter)
router.use("/admin" , adminRouter)

export default router

