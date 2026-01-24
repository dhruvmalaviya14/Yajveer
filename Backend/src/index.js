//
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/index.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://yajveer.vercel.app",
      "https://yajveer-admin.vercel.app",
      "https://www.yajveer.in/",
    ],
    credentials: true,
  },
});

// Make io accessible in controllers
app.set("io", io);

connectDB()
  .then(() => {
    const PORT = 2590;
    server.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

export default app;
