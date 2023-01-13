import { decrypt } from "cqx-secure/libs/crypto";
import express from "express";
import jwt from 'jsonwebtoken';
import db from "../configs/db";


export default function checkToken(...permissions: string[]) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            permissions = permissions.length === 0 ? ["public"] : permissions
            let token: string = decrypt(String(req.headers["x-access-token"]))
            if (token !== null) {
                let reply = await db.token_.findFirst({ where: { value: token } })
                if (reply === null) {
                    res.status(401).send({ error: "ErrorPermission", message: "Invalid Token" })
                }
                else {
                    try {
                        token = decrypt(token)
                        let pass = decrypt(String(reply.pass))
                        let data = jwt.verify(token, pass)
                        if (permissions) {
                            let userPermission = data['permission_']
                            if (permissions.includes(userPermission)) {
                                next()
                            } else {
                                res.status(401).send({ error: "ErrorPermission", message: "Invalid Token" })
                            }
                        } else {
                            next();
                        }
                    } catch (error) {
                        res.status(401).send({ error: "ErrorPermission", message: "Invalid Token" })
                    }
                }
            } else {
                res.status(401).send({ error: "ErrorPermission", message: "Invalid Token" })
            }
        } catch (error) {
            res.status(401).send({ error: "ErrorPermission", message: "Invalid Token" })
            console.error(error);
        }
    };
}