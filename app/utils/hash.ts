import { SHA256 as sha256 } from 'crypto-js'

export function hashPassword(password: string) {
    return sha256(password).toString()
}