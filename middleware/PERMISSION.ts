import { Request, Response, NextFunction } from 'express';
import { User } from "../models/User"
import { Role } from "../models/Role"

interface CustomRequest extends Request {
    userId?: string;
}

export default function verifyPermission(permissions: string[]) {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(403).send({ message: "User not found!" });
            }

            const roles = await user.getUserRoles();

            const rolePermissions = (await Promise.all(roles.map(async (role: Role) => {
                return role.getRolePermissions(); 
            }))).flat();            

            const hasPermission = permissions.some(permission =>
                rolePermissions.some(rolePermission => rolePermission.get('name') === permission)
            );

            if (!hasPermission) {
                return res.status(403).json({ error: 'You do not have permissions' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
