"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const express_1 = __importDefault(require("express"));
const FeedbackController_1 = require("../controller/FeedbackController");
exports.feedbackRouter = express_1.default.Router();
exports.feedbackRouter.post("/createfeedback/:id", new FeedbackController_1.FeedbackController().createFeedback);
exports.feedbackRouter.post("/updatefeedback/:id", new FeedbackController_1.FeedbackController().updateFeedback);
exports.feedbackRouter.get("/getcreatedfb", new FeedbackController_1.FeedbackController().getCreatedFeedbacks);
exports.feedbackRouter.get("/getfbreceived", new FeedbackController_1.FeedbackController().getFeedbacksReceived);
