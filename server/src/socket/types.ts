import type { Socket } from "socket.io";

export interface SocketData {
    userId: string;
    organizationId: string;
}

export type AppSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

export interface ClientToServerEvents {
    "chat:send": (data: {
        content: string;
    }) => void;
}

export interface ServerToClientEvents {
    "chat:message": (message: {
        id: string;
        organizationId: string;
        senderId: string;
        content: string;
        createdAt: Date;
    }) => void;

    "chat:error": (data: {
        message: string;
    }) => void;
}

export interface InterServerEvents {}