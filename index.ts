import express from "express";
import { sync } from "./models";

import userRoutes from "./router/user.routes";
import permissionRoutes from "./router/permission.routes";
import roleRoutes from "./router/role.routes";

import verifyPermission from "./middleware/PERMISSION";
import verifyToken from "./middleware/JWT";

const routes = (app: express.Application) => {
    userRoutes(app);
    permissionRoutes(app);
    roleRoutes(app);
}


export default {
    dbSync: sync,
    routes,
    verifyToken,
    verifyPermission
};