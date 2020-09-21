import express from 'express';
import { FeedbackController } from '../controller/FeedbackController';

export const feedbackRouter = express.Router();

feedbackRouter.post("/createfeedback/:id", new FeedbackController().createFeedback);
feedbackRouter.post("/updatefeedback/:id", new FeedbackController().updateFeedback);
feedbackRouter.get("/getcreatedfb", new FeedbackController().getCreatedFeedbacks);
feedbackRouter.get("/getfbreceived", new FeedbackController().getFeedbacksReceived);