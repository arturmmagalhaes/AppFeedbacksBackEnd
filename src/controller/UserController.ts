import { Request, Response} from 'express';
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from '../services/Authenticator';
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    
    private static USERBUSINESS = new UserBusiness(
        new UserDatabase() as any,
        new IdGenerator() as any,
        new HashManager() as any,
        new Authenticator() as any
    );

    public async createUser(req: Request, res: Response) {
        try {

            const dataController = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            await UserController.USERBUSINESS.createUser(dataController);

            res.status(200).send({
                message: "Created User"
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async login(req: Request, res: Response) {
        try {
            
            const dataController = {
                email: req.body.email,
                password: req.body.password
            }

            const result = await UserController.USERBUSINESS.login(dataController);

            res.status(200).send({
                result
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async getUsers(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            const result = await UserController.USERBUSINESS.getUsers(token);
            
            res.status(200).send({
                result
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}