import { Request, Response } from "express";
import { Role } from "../../models/Role";

export default async function listAllRoles(req: Request, res: Response): Promise<void> {
    try {

        let roles = await Role.findAll();
        res.status(200).send(roles);

    } catch (err) {
        res.status(500).send({ err });
    }
}