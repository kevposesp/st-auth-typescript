import { Response } from "express";
import { CustomRequest } from "../../types/request";
import { User } from "../../models/User";

export default async function profile(req: CustomRequest, res: Response): Promise<void> {

    try {
        const user = await User.findByPk(req.userId);

        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        res.status(200).send(await user.toResponse());

    } catch (err: Error | any) {
        res.status(500).send({ message: err.message });
    }
}