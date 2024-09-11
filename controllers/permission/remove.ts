import { Request, Response } from "express";
import { Permission } from "../../models/Permission";

export default async function remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            res.status(404).send({ message: "Permission not found" });
            return; 
        }

        await permission.destroy();

        res.status(200).send({ message: "Permission deleted" });

    } catch (err) {
        res.status(500).send({ err });
    }
}