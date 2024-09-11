import { Request, Response } from "express";
import { User } from "../../models/User";
import { CustomRequest } from "../../types/request";
import existsEmail from "../../utils/existsEmail";
import existsUsername from "../../utils/existsUsername";

interface UpdateRequestBody {
    name: string | undefined;
    email: string | undefined;
    address: string | undefined;
    phone: string | undefined;
    username: string | undefined;
    password: string | undefined;
    enableLog: boolean | undefined;
    status: number | undefined;
}

export default async function update(req: Request<{}, {}, UpdateRequestBody> & CustomRequest, res: Response): Promise<void> {
    const {
        name,
        email,
        address,
        phone,
        username,
        enableLog,
        status
    } = req.body;

    try {
        const user = await User.findByPk(req.userId);

        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        if (email !== undefined && email !== user.get('email')) {            
            if (await existsEmail(email)) {
                res.status(400).send({ message: "Email already in use" });
                return;
            }
            user.set('email', email);
        }

        if (username !== undefined && username !== user.username) {
            if (await existsUsername(username)) {
                res.status(400).send({ message: "Username already in use" });
                return;
            }
            user.set('username', username);
        }

        if (name !== undefined) user.set('name', name);
        if (address !== undefined) user.set('address', address);
        if (phone !== undefined) user.set('phone', phone);
        if (enableLog !== undefined) user.set('enableLog', enableLog);
        if (status !== undefined) user.set('status', status);

        await user.save();

        res.status(200).send({ message: "User updated successfully", user: await user.toResponse() });
    } catch (err) {
        res.status(500).send({ err });
    }
}
