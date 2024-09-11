import { Application } from "express";

import controllers from "../controllers";
const { permission } = controllers;
const { create, listAllPermissions, update, remove } = permission;

import verifyToken from "../middleware/JWT";
import verifyPermission from "../middleware/PERMISSION";

export default function (app: Application): void {
    
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/permission/all", [verifyToken, verifyPermission(["readPermission"])], listAllPermissions);
    app.post("/permission/create", [verifyToken, verifyPermission(["createPermission"])], create);
    app.put("/permission/update/:id", [verifyToken, verifyPermission(["updatePermission"])], update);
    app.delete("/permission/delete/:id", [verifyToken, verifyPermission(["deletePermission"])], remove);

}
