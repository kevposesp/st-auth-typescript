import { Request, Response } from "express";
import { Role } from "../../models/Role";

export default async function create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: "Missing required fields" });
        return;
    }

    try {

        if (await Role.findOne({ where: { name } })) {
            res.status(400).send({ message: "Role already exists" });
            return
        }

        let role = await Role.create({
            name
        });

        res.status(201).send({ message: "Role created" });

    } catch (err) {
        res.status(500).send({ err });
    }
}