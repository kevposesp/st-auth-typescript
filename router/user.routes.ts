import { Application } from "express";

import controllers from "../controllers";
const { user } = controllers;
const { profile, register, login, update, addOrRemoveRole } = user;

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
    
    app.get("/user", [verifyToken], profile);
    app.post("/user/login", [], login);
    app.post("/user/register", [], register);
    app.put("/user/update", [verifyToken], update);
    app.post("/user/addOrRemoveRole/:id", [verifyToken, verifyPermission(["addOrRemoveRole"])], addOrRemoveRole);

}
