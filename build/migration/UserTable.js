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
exports.UserTable = void 0;
const BaseDatabase_1 = require("../database/base/BaseDatabase");
class UserTable extends BaseDatabase_1.BaseDatabase {
    createTableUser() {
        const _super = Object.create(null, {
            connection: { get: () => super.connection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.connection.call(this).raw(`
            CREATE TABLE IF NOT EXISTS ${UserTable.TABLE_USER} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
        });
    }
}
exports.UserTable = UserTable;
UserTable.TABLE_USER = "User";
