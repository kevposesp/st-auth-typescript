import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../../models/User";

export default async function register(req: Request, res: Response): Promise<void> {
    const {
        name = null,
        email,
        address = null,
        phone = null,
        username,
        password: pass,
        enableLog = true,
        status = 1
    } = req.body;

    if (!username || !email || !pass) {
        res.status(400).send({ message: "Missing required fields" });
        return;
    }

    try {
        let user = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if (user) {
            res.status(400).send({ message: "User already exists" });
            return;
        }

        // Create new user
        user = await User.create({
            name,
            email,
            address,
            phone,
            username,
            password: pass,
            enableLog,
            status
        });

        const { password, ...userWithoutPassword } = user.get();        

        res.status(200).send(
            {
                message: "User created",
                user: userWithoutPassword
            }
        );

    } catch (err) {
        res.status(500).send({ err });
    }
}