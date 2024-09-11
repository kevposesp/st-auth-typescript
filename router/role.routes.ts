import { Application } from "express";

import controllers from "../controllers";
const { role } = controllers;
const { create, listAllRoles, update, remove, addOrRemovePermission } = role;

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

    app.get("/role/all", [verifyToken, verifyPermission(["readRole"])], listAllRoles);
    app.post("/role/create", [verifyToken, verifyPermission(["createRole"])], create);
    app.put("/role/update/:id", [verifyToken, verifyPermission(["updateRole"])], update);
    app.delete("/role/delete/:id", [verifyToken, verifyPermission(["deleteRole"])], remove);
    app.post("/role/addOrRemovePermission/:id", [verifyToken, verifyPermission(["addOrRemovePermission"])], addOrRemovePermission)

}
