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
exports.UserBusiness = void 0;
class UserBusiness {
    constructor(userDatabase, idGenerate, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerate = idGenerate;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    createUser(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController) {
                throw new Error("Invalid Entry");
            }
            const dataBusiness = {
                id: this.idGenerate.generate(),
                name: dataController.name,
                email: dataController.email,
                password: yield this.hashManager.hash(dataController.password)
            };
            yield this.userDatabase.createUser(dataBusiness);
        });
    }
    login(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController) {
                throw new Error("Invalid Entry");
            }
            const user = yield this.userDatabase.login(dataController.email);
            if (!user.password) {
                throw new Error("Invalid Email or Password");
            }
            const result = yield this.hashManager.compare(dataController.password, user.password);
            if (!result) {
                throw new Error("Invalid Email or Password");
            }
            const token = yield this.authenticator.generateToken({ id: user.id });
            return {
                token,
                name: user.name,
                email: user.email
            };
        });
    }
    getUsers(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield this.authenticator.getData(token);
            const users = yield this.userDatabase.getUsers(tokenData.id);
            return users;
        });
    }
}
exports.UserBusiness = UserBusiness;
