import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const fieldValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        message: errors.array()[0].msg,
        errors: errors.array()
      })
    }
    next();
};

export default fieldValidator;