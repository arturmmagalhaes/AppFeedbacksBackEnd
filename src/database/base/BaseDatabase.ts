import Knex from "knex";
import knex from "knex";

export abstract class BaseDatabase {

    private static CONNECTION: null | Knex;

    protected connection() {
        if(!BaseDatabase.CONNECTION){
            BaseDatabase.CONNECTION = knex({
                client: "mysql",
                connection: {
                    database: process.env.DB_NAME,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT) | 3306
                }
            });
        }
        return BaseDatabase.CONNECTION;
    }

    protected async destroyConnection() {
        if(BaseDatabase.CONNECTION){
            BaseDatabase.CONNECTION = null;
        }
    }
}