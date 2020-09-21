import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import { userRouter } from './router/UserRouter';
import { feedbackRouter } from './router/FeedbackRouter';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(feedbackRouter);

const server = app.listen(3003, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})