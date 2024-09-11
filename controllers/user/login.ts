import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../../models/User";

export default async function login(req: Request, res: Response): Promise<void> {
    const { user, password: pass } = req.body;

    if (!user || !pass) {
        res.status(400).send({ message: "Missing required fields" });
    }

    try {
        let _user: User | null = await User.findOne({
            where: {
                [Op.or]: [
                    { username: user },
                    { email: user }
                ]
            }
        });

        if (!_user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        if (!_user.get('enableLog')) {
            res.status(401).send({ message: "User is disabled" });
            return;
        }

        let passwordIsValid = await _user.validatePassword(pass);

        if (!passwordIsValid) {
            res.status(401).send({
                message: "Invalid Password!"
            });
            return;
        }        

        res.status(200).send(await _user.toLoginResponse());

    } catch (err) {
        res.status(500).send({ err });
    }
}