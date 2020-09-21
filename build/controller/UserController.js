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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../database/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataController = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                yield UserController.USERBUSINESS.createUser(dataController);
                res.status(200).send({
                    message: "Created User"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataController = {
                    email: req.body.email,
                    password: req.body.password
                };
                const result = yield UserController.USERBUSINESS.login(dataController);
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
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield UserController.USERBUSINESS.getUsers(token);
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
}
exports.UserController = UserController;
UserController.USERBUSINESS = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
