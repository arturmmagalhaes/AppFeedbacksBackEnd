import { BaseDatabase } from "../database/base/BaseDatabase";

export class UserTable extends BaseDatabase {
    
    private static TABLE_USER = "User";

    public async createTableUser() {
        await super.connection().raw(`
            CREATE TABLE IF NOT EXISTS ${UserTable.TABLE_USER} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
    }
}