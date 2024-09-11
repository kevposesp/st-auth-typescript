import { Request, Response } from "express";
import { Role } from "../../models/Role";

export default async function create(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: "Missing required fields" });
    }

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            res.status(404).send({ message: "Role not found" });
            return;
        }

        role.set('name', name);
        await role.save();

        res.status(200).send({ message: "Role updated" });

    } catch (err) {
        res.status(500).send({ err });
    }
}