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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FeedbackTable_1 = require("./FeedbackTable");
const UserTable_1 = require("./UserTable");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = new UserTable_1.UserTable();
const feedback = new FeedbackTable_1.FeedbackTable();
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.createTableUser();
        yield feedback.createTableUser();
    });
}
createTables();
