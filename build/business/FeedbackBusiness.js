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
exports.FeedbackBusiness = void 0;
class FeedbackBusiness {
    constructor(feedbackDatabase, idGenerate, authenticator) {
        this.feedbackDatabase = feedbackDatabase;
        this.idGenerate = idGenerate;
        this.authenticator = authenticator;
    }
    createFeedback(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController) {
                throw new Error("Invalid Entry");
            }
            const day = new Date();
            const id_create_fb = yield this.authenticator.getData(dataController.token);
            const date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
            const dataBusiness = {
                id: this.idGenerate.generate(),
                id_create_fb: id_create_fb.id,
                date: date,
                improve: dataController.improve,
                keep: dataController.keep,
                suggestions: dataController.suggestions,
                final_fb: dataController.final_fb,
                id_user: dataController.id_user
            };
            const result = yield this.feedbackDatabase.createFeedback(dataBusiness);
            return result;
        });
    }
    getCreatedFeedbacks(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Invalid id");
            }
            const tokenData = yield this.authenticator.getData(token);
            const result = yield this.feedbackDatabase.getCreatedFeedbacks(tokenData.id);
            return result;
        });
    }
    getFeedbacksReceived(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Invalid id");
            }
            const tokenData = yield this.authenticator.getData(token);
            const result = yield this.feedbackDatabase.getFeedbacksReceived(tokenData.id);
            return result;
        });
    }
    updateFeedback(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController) {
                throw new Error("Invalid Error");
            }
            const dataBusiness = {
                improve: dataController.improve,
                keep: dataController.keep,
                suggestions: dataController.suggestions,
                final_fb: dataController.final_fb,
                id: dataController.id_user
            };
            const result = yield this.feedbackDatabase.updateFeedback(dataBusiness);
            return result;
        });
    }
}
exports.FeedbackBusiness = FeedbackBusiness;
