import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/database.js";
import dotenv from "./config/dotenv.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// make io available later
export { io };

connectDB();

httpServer.listen(dotenv.PORT, () => {
  console.log(`Server running on port ${dotenv.PORT}`);
});
