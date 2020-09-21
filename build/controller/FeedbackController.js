"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const FeedbackBusiness_1 = require("../business/FeedbackBusiness");
const FeedbackDatabase_1 = require("../database/FeedbackDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class FeedbackController {
    createFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const dataController = {
                    token: token,
                    improve: req.body.improve,
                    keep: req.body.keep,
                    suggestions: req.body.suggestions,
                    final_fb: req.body.final_fb,
                    id_user: req.params.id
                };
                yield FeedbackController.FEEDBACKBUSINESS.createFeedback(dataController);
                res.status(200).send({
                    message: "Created Feedback"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    getCreatedFeedbacks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield FeedbackController.FEEDBACKBUSINESS.getCreatedFeedbacks(token);
                res.status(200).send({
                    result
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    getFeedbacksReceived(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield FeedbackController.FEEDBACKBUSINESS.getFeedbacksReceived(token);
                res.status(200).send({
                    result
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    updateFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const dataController = {
                    token: token,
                    improve: req.body.improve,
                    keep: req.body.keep,
                    suggestions: req.body.suggestions,
                    final_fb: req.body.final_fb,
                    id_user: req.params.id
                };
                yield FeedbackController.FEEDBACKBUSINESS.updateFeedback(dataController);
                res.status(200).send({
                    message: "Update Feedback"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
}
exports.FeedbackController = FeedbackController;
FeedbackController.FEEDBACKBUSINESS = new FeedbackBusiness_1.FeedbackBusiness(new FeedbackDatabase_1.FeedbackDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
