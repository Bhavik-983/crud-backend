import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import fieldValidator from "../middleware/fieldvalidator.middlware.js";

const router = Router();

router.post("/login",
    check("email").notEmpty().withMessage("Email is required")
        .trim()
        .isEmail().withMessage("Email is invalid"),
    check("password").notEmpty().withMessage("Password is required"),
    fieldValidator,
    login);

export default router;