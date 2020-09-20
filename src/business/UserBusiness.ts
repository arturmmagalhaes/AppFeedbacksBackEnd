import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerate: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ){}

    public async createUser(dataController: any) {
        if(!dataController) {
            throw new Error("Invalid Entry");
        }

        const dataBusiness = {
            id: this.idGenerate.generate(),
            name: dataController.name,
            email: dataController.email,
            password: await this.hashManager.hash(dataController.password)
        }

        await this.userDatabase.createUser(dataBusiness);
    }

    public async login(dataController: any) {
        if(!dataController) {
            throw new Error("Invalid Entry");
        }

        const user = await this.userDatabase.login(dataController.email);

        if(!user.password){
            throw new Error("Invalid Email or Password");
        }

        const result = await this.hashManager.compare(dataController.password, user.password);
        
        if(!result){
            throw new Error("Invalid Email or Password");
        }

        const token = await this.authenticator.generateToken({id: user.id})

        return {
            token,
            name: user.name,
            email: user.email
        }
    }

    public async getUsers(token: string) {
        const tokenData = await this.authenticator.getData(token);

        const users = await this.userDatabase.getUsers(tokenData.id);

        return users;
    }
}