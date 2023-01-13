import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { decrypt, encrypt } from 'cqx-secure';
import db from '../configs/db';

export async function giveToken(data: object, ip: string, userAgent: string, permission: string = 'public', expiresIn: string = '24h') {
    try {
        let data2 = { ...data, permission_: permission, ip_: ip, userAgent_: userAgent }
        let pass = randomBytes(32).toString('base64')
        let token = encrypt(jwt.sign(data2, pass, { expiresIn: expiresIn }))

        await db.token_.create({ data: { pass: encrypt(pass), value: token } })

        return encrypt(token)

    } catch (error) { console.error(error); }
}

export async function freeToken(token: string) {
    try {
        await db.token_.delete({ where: { value: decrypt(token) } })
        return token
    } catch (error) { console.error(error); }
}
