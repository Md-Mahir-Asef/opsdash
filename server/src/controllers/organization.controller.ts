import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";

export const getOrganizationData = (req: Request, res: Response) => {
    try {
        const info = getAuth(req);
        console.log(info);
        res.sendApi(info);
    } catch (err) {
        console.log(err);
    }
};

export const getOrganizationList = (req: Request, res: Response) => {
    try {
        const info = getAuth(req);
        console.log(info);
        res.sendApi(info);
    } catch (err) {
        console.log(err);
    }
};
