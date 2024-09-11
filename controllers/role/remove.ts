import { Request, Response } from "express";
import { Role } from "../../models/Role";

export default async function remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            res.status(404).send({ message: "Role not found" });
            return; 
        }

        await role.destroy();

        res.status(200).send({ message: "Role deleted" });

    } catch (err) {
        res.status(500).send({ err });
    }
}