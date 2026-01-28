import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dotenvPath = path.join(__dirname, "../../.env");


export default {
    PORT: process.env.PORT || 8000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/interview-task",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@gmail.com",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "Admin@123",
    ADMIN_NAME: process.env.ADMIN_NAME || "Admin",
    ACCESS_TOKEN_SEC: process.env.ACCESS_TOKEN_SEC || "useracestkn",
    EXP_TIME: process.env.EXP_TIME || "1d"
}