import type { Socket } from "socket.io";
import type { SocketData } from "./types";

export async function socketAuthMiddleware(
    socket: Socket<any, any, any, SocketData>,
    next: (err?: Error) => void,
) {
    try {
        // TODO:
        // Validate Clerk authentication here.

        const userId = "...";
        const organizationId = "...";

        if (!userId || !organizationId) {
            return next(
                new Error("Unauthorized"),
            );
        }

        socket.data.userId = userId;
        socket.data.organizationId = organizationId;

        next();
    } catch {
        next(new Error("Unauthorized"));
    }
}