import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import type { SocketData } from "./types";
import { registerChatHandlers } from "./handler/chat.handler";

export function createSocketServer(httpServer: HttpServer) {
    const io = new Server<
        never,
        never,
        never,
        SocketData
    >(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        const { userId, organizationId } = socket.data;

        // Every organization gets its own room.
        socket.join(`organization:${organizationId}`);

        registerChatHandlers(io, socket);

        socket.on("disconnect", (reason) => {
            console.log(
                `Socket disconnected: ${socket.id} - ${reason}`,
            );
        });
    });

    return io;
}