// utils/socket.js
let ioInstance;

export async function initSocketIO(server) {
  const { Server } = await import("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://yajveer.vercel.app",
        "https://yajveer-admin.vercel.app",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);
  });

  return ioInstance;
}

export function getIO() {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized!");
  }
  return ioInstance;
}
