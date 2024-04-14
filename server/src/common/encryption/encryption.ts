import { randomBytes, createCipheriv, createDecipheriv, pbkdf2Sync } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly key: Buffer;
    // private readonly iv = '7d8z467a86e2e1ef';
    private readonly ivLength = 16;

    constructor() {
        this.key = pbkdf2Sync(process.env.KEY, 'salt', 100000, 32, 'sha256');
    }

    encrypt(text: string): { encryptedData: string, iv: string, tag: string } {
        const iv = randomBytes(this.ivLength).toString('hex');
        const cipher = createCipheriv(this.algorithm, Buffer.from(this.key), Buffer.from(iv, 'hex'));
        let encryptedData = cipher.update(text, 'utf8', 'hex');
        encryptedData += cipher.final('hex');
        const tag = cipher.getAuthTag().toString('hex');
        return { encryptedData, iv, tag };
    }

    decrypt(encryptedData: string, iv: string, tag: string): string {
        const decipher = createDecipheriv(this.algorithm, Buffer.from(this.key), Buffer.from(iv, 'hex'));
        decipher.setAuthTag(Buffer.from(tag, 'hex'));
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }
}
