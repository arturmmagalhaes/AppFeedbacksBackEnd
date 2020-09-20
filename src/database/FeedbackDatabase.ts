import { BaseDatabase } from "./base/BaseDatabase";

export class FeedbackDatabase extends BaseDatabase {

    private static TABLE_NAME = "Feedback";
    private static TABLE_USER = "User";

    public async createFeedback (data: any){
        try{
            await super.connection().raw(`
                INSERT INTO ${FeedbackDatabase.TABLE_NAME} 
                VALUES ("${data.id}", "${data.id_create_fb}", "${data.date}", "${data.improve}", "${data.keep}", "${data.suggestions}", "${data.final_fb}", "${data.id_user}")
        `);
        } catch(error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async getCreatedFeedbacks(id: string) {
        try {
            const result = await super.connection().raw(`
                SELECT ${FeedbackDatabase.TABLE_NAME}.id, id_create_fb, date, improve, keep, suggestions, final_fb, id_user, name, email
                FROM ${FeedbackDatabase.TABLE_NAME}
                JOIN ${FeedbackDatabase.TABLE_USER} ON ${FeedbackDatabase.TABLE_NAME}.id_user = ${FeedbackDatabase.TABLE_USER}.id
                WHERE ${FeedbackDatabase.TABLE_NAME}.id_create_fb = "${id}"
            `);
            
            return result[0];
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async getFeedbacksReceived(id: string) {
        try {
            const result = await super.connection().raw(`
                SELECT * FROM ${FeedbackDatabase.TABLE_NAME}
                JOIN ${FeedbackDatabase.TABLE_USER} ON ${FeedbackDatabase.TABLE_NAME}.id_user = ${FeedbackDatabase.TABLE_USER}.id
                WHERE ${FeedbackDatabase.TABLE_NAME}.id_user = "${id}"
            `);

            return result[0];
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

}
