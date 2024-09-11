import { Request, Response } from "express";
import { Role } from "../../models/Role";
import { Permission } from "../../models/Permission";

export default async function addOrRemovePermission(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { permissionId } = req.body;

    if (!permissionId) {
        res.status(400).send({ message: "Missing required fields" });
        return;
    }

    try {
        let role = await Role.findByPk(id);

        if (!role) {
            res.status(404).send({ message: "Role not found" });
            return;
        }

        let permission = await Permission.findByPk(permissionId);

        if (!permission) {
            res.status(404).send({ message: "Permission not found" });
            return;
        }
        
        const hasPermission = await role.hasRolePermission(permission);        

        if (hasPermission) {
            await role.removeRolePermission(permission);
            res.status(200).send({ message: "Permission removed from role" });
        } else {            
            await role.addRolePermission(permission);
            res.status(200).send({ message: "Permission added to role" });
        }

    } catch (err) {        
        console.log(err);
        
        res.status(500).send({ err });
    }
}