import { FeedbackDatabase } from "../database/FeedbackDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class FeedbackBusiness {
    constructor(
        private feedbackDatabase: FeedbackDatabase,
        private idGenerate: IdGenerator,
        private authenticator: Authenticator
    ){}

    public async createFeedback(dataController: any) {
        if(!dataController) {
            throw new Error("Invalid Entry");
        }
        const day = new Date()

        const id_create_fb = await this.authenticator.getData(dataController.token);
        
        const date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()
 
        const dataBusiness = {
            id: this.idGenerate.generate(),
            id_create_fb: id_create_fb.id,
            date: date,
            improve: dataController.improve,
            keep: dataController.keep,
            suggestions: dataController.suggestions,
            final_fb: dataController.final_fb,
            id_user: dataController.id_user
        }

        const result = await this.feedbackDatabase.createFeedback(dataBusiness);

        return result;
    }

    public async getCreatedFeedbacks(token: string) {
        if(!token) {
            throw new Error("Invalid id");
        }

        const tokenData = await this.authenticator.getData(token);

        const result = await this.feedbackDatabase.getCreatedFeedbacks(tokenData.id);
        
        return result;
    }
    
    public async getFeedbacksReceived(token: string) {
        if(!token) {
            throw new Error("Invalid id");
        }

        const tokenData = await this.authenticator.getData(token);

        const result = await this.feedbackDatabase.getFeedbacksReceived(tokenData.id);
        
        return result;
    }
}