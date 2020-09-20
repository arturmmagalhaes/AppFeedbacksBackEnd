import bcrypt from 'bcrypt';

export class HashManager {
    public async hash(password: string) {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    public async compare(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }
}