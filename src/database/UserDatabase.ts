import { BaseDatabase } from "./base/BaseDatabase";

export class UserDatabase extends BaseDatabase{

    private static TABLE_NAME = "User";

    public async createUser(data: any) {
        try{
            await super.connection().raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} 
                VALUES ("${data.id}", "${data.name}", "${data.email}", "${data.password}")
        `);
        } catch(error){
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async login (email: any) {
        try{
            const result = await super.connection().raw(`
                SELECT * FROM ${UserDatabase.TABLE_NAME} 
                WHERE email = "${email}"
            `);

            return result[0][0];
        } catch(error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async getUsers(id: string) {
        try{
            const result = await super.connection().raw(`
                SELECT id, name, email FROM ${UserDatabase.TABLE_NAME}
                WHERE id != "${id}"
            `);

        return result[0];
        } catch(error) {
            throw new Error(error.message);
        }
    }
}