import { Request, Response } from "express";
import { Role } from "../../models/Role";
import { User } from "../../models/User";

export default async function addOrRemoveRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
        res.status(400).send({ message: "Missing required fields" });
        return;
    }

    try {
        let user = await User.findByPk(id);

        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        let role = await Role.findByPk(roleId);

        if (!role) {
            res.status(404).send({ message: "Role not found" });
            return;
        }

        const hasRole = await user.hasUserRole(role);        

        if (hasRole) {
            await user.removeUserRole(role);
            res.status(200).send({ message: "Role removed from user" });
        } else {            
            await user.addUserRole(role);
            res.status(200).send({ message: "Role added to user" });
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}