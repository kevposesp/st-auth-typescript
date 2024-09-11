import { Request, Response } from "express";
import { Permission } from "../../models/Permission";

export default async function create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: "Missing required fields" });
        return;
    }

    try {

        if (await Permission.findOne({ where: { name } })) {
            res.status(400).send({ message: "Permission already exists" });
            return
        }

        let permission = await Permission.create({
            name
        });

        res.status(201).send({ message: "Permission created" });

    } catch (err) {
        res.status(500).send({ err });
    }
}