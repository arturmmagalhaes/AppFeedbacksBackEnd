import jsonwebtoken from 'jsonwebtoken';

export class Authenticator {
    
    public async generateToken(input: AuthenticatorData) {
        const token = await jsonwebtoken.sign({
            id: input.id
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: '1d'
            }
        )

        return token;
    }

    public async getData(token: string) {
        const payload = await jsonwebtoken.verify(token, process.env.JWT_KEY as string) as any
        return {
            id: payload.id
        }
    }
}

export interface AuthenticatorData {
    id: string
}