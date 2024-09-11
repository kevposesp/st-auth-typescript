import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../config/auth.config";

const JWT_SECRET = config.secret;

interface CustomRequest extends Request {
    userId?: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string | undefined;    

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
            }
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        const decodedPayload = decoded as JwtPayload;
        req.userId = decodedPayload.id;        

        next();
    });
};

export default verifyToken;