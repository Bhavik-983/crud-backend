import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import dotenv from "../config/dotenv.js";
import constant from "../utils/constant.js";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
    try {
        await mongoose.connect(dotenv.MONGO_URI);

        await UserModel.deleteMany();
        const users = [];

        // Admin
        users.push({
            name: dotenv.ADMIN_NAME,
            email: dotenv.ADMIN_EMAIL,
            password: await bcrypt.hash(dotenv.ADMIN_PASSWORD, 10),
            role: constant.ROLE[0]
        });

        // 10 Normal Users
        for (let i = 1; i <= 10; i++) {
            users.push({
                name: `User ${i}`,
                email: `user${i}@example.com`,
                password: await bcrypt.hash("user123", 10),
                role: constant.ROLE[1]
            });
        }

        await UserModel.insertMany(users);

        console.log("Users seeded successfully");
    } catch (error) {
        console.error("Seeding failed", error);
    }
};

seedUsers()