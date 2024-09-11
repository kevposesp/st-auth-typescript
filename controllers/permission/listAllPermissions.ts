import { Request, Response } from "express";
import { Permission } from "../../models/Permission";

export default async function listAllPermissions(req: Request, res: Response): Promise<void> {
    try {

        let permissions = await Permission.findAll();
        res.status(200).send(permissions);

    } catch (err) {
        res.status(500).send({ err });
    }
}