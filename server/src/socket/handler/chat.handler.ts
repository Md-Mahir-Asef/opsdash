import type { Server } from "socket.io";

import type {
    AppSocket,
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "../types";

export function registerChatHandlers(
    io: Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >,
    socket: AppSocket,
) {
    // socket.on("chat:send", async ({ content }) => {
    //     try {
    //         const { userId, organizationId } = socket.data;

    //         if (!content.trim()) {
    //             return socket.emit("chat:error", {
    //                 message: "Message cannot be empty",
    //             });
    //         }

    //         // Save message to database here.

    //         const message = {
    //             id: crypto.randomUUID(),
    //             organizationId,
    //             senderId: userId,
    //             content: content.trim(),
    //             createdAt: new Date(),
    //         };

    //         io.to(`organization:${organizationId}`).emit(
    //             "chat:message",
    //             message,
    //         );
    //     } catch {
    //         socket.emit("chat:error", {
    //             message: "Failed to send message",
    //         });
    //     }
    // });
}