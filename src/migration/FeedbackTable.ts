import { BaseDatabase } from "../database/base/BaseDatabase";

export class FeedbackTable extends BaseDatabase {

    private static TABLE_FEEDBACK = "Feedback";

    public async createTableUser() {
        await super.connection().raw(`
            CREATE TABLE IF NOT EXISTS ${FeedbackTable.TABLE_FEEDBACK} (
                id VARCHAR(255) PRIMARY KEY,
                id_create_fb VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                improve VARCHAR(255) NOT NULL,
                keep VARCHAR(255) NOT NULL,
                suggestions VARCHAR(255) NOT NULL,
                final_fb VARCHAR(255) NOT NULL,
                id_user VARCHAR(255) NOT NULL,
                FOREIGN KEY (id_create_fb) REFERENCES User(id),
                FOREIGN KEY (id_user) REFERENCES User(id)
            )
        `);
    }
}