import { Request, Response } from 'express';
import { FeedbackBusiness } from "../business/FeedbackBusiness";
import { FeedbackDatabase } from "../database/FeedbackDatabase";
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from "../services/IdGenerator";

export class FeedbackController {

    private static FEEDBACKBUSINESS = new FeedbackBusiness(
        new FeedbackDatabase() as any,
        new IdGenerator() as any,
        new Authenticator() as any
    );

    public async createFeedback(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            const dataController = {
                token: token,
                improve: req.body.improve,
                keep: req.body.keep,
                suggestions: req.body.suggestions,
                final_fb: req.body.final_fb,
                id_user: req.params.id as string
            }

            await FeedbackController.FEEDBACKBUSINESS.createFeedback(dataController);

            res.status(200).send({
                message: "Created Feedback"
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async getCreatedFeedbacks(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            const result = await FeedbackController.FEEDBACKBUSINESS.getCreatedFeedbacks(token as string);

            res.status(200).send({
                result
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
    
    public async getFeedbacksReceived(req: Request, res: Response) {
        try {
            
            const token = req.headers.authorization as string;

            const result = await FeedbackController.FEEDBACKBUSINESS.getFeedbacksReceived(token as string);

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

