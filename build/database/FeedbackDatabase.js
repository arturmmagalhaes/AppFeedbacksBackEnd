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
exports.FeedbackDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
class FeedbackDatabase extends BaseDatabase_1.BaseDatabase {
    createFeedback(data) {
        const _super = Object.create(null, {
            connection: { get: () => super.connection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connection.call(this).raw(`
                INSERT INTO ${FeedbackDatabase.TABLE_NAME} 
                VALUES ("${data.id}", "${data.id_create_fb}", "${data.date}", "${data.improve}", "${data.keep}", "${data.suggestions}", "${data.final_fb}", "${data.id_user}")
        `);
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
    getCreatedFeedbacks(id) {
        const _super = Object.create(null, {
            connection: { get: () => super.connection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.connection.call(this).raw(`
                SELECT ${FeedbackDatabase.TABLE_NAME}.id, id_create_fb, date, improve, keep, suggestions, final_fb, id_user, name, email
                FROM ${FeedbackDatabase.TABLE_NAME}
                JOIN ${FeedbackDatabase.TABLE_USER} ON ${FeedbackDatabase.TABLE_NAME}.id_user = ${FeedbackDatabase.TABLE_USER}.id
                WHERE ${FeedbackDatabase.TABLE_NAME}.id_create_fb = "${id}"
            `);
                return result[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
    getFeedbacksReceived(id) {
        const _super = Object.create(null, {
            connection: { get: () => super.connection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.connection.call(this).raw(`
                SELECT * FROM ${FeedbackDatabase.TABLE_NAME}
                JOIN ${FeedbackDatabase.TABLE_USER} ON ${FeedbackDatabase.TABLE_NAME}.id_user = ${FeedbackDatabase.TABLE_USER}.id
                WHERE ${FeedbackDatabase.TABLE_NAME}.id_user = "${id}"
            `);
                return result[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
    updateFeedback(data) {
        const _super = Object.create(null, {
            connection: { get: () => super.connection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connection.call(this).raw(`
                UPDATE ${FeedbackDatabase.TABLE_NAME}
                SET improve = "${data.improve}", keep = "${data.keep}", suggestions = "${data.suggestions}", final_fb = "${data.final_fb}"
                WHERE id = "${data.id}";
        `);
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
}
exports.FeedbackDatabase = FeedbackDatabase;
FeedbackDatabase.TABLE_NAME = "Feedback";
FeedbackDatabase.TABLE_USER = "User";
