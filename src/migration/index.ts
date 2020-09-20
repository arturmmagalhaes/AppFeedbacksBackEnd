import { FeedbackTable } from "./FeedbackTable";
import { UserTable } from "./UserTable"
import dotenv from 'dotenv';

dotenv.config();

const user = new UserTable();
const feedback = new FeedbackTable();

async function createTables() {
    await user.createTableUser();
    await feedback.createTableUser();
}

createTables();