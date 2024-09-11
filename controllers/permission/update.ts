import { Request, Response } from "express";
import { Permission } from "../../models/Permission";

export default async function create(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: "Missing required fields" });
    }

    try {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            res.status(404).send({ message: "Permission not found" });
            return;
        }

        permission.set('name', name);
        await permission.save();

        res.status(200).send({ message: "Permission updated" });

    } catch (err) {
        res.status(500).send({ err });
    }
}