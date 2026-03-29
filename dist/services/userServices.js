"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.updateUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const createUser = async (name, email, password, role, tenantId, avatar) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    return database_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            avatar,
            tenantId: tenantId || null,
        }
    });
};
exports.createUser = createUser;
const updateUser = async (id, data) => {
    return database_1.default.user.update({
        where: { id },
        data
    });
};
exports.updateUser = updateUser;
const findUserByEmail = async (email) => {
    return database_1.default.user.findUnique({
        where: { email }
    });
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=userServices.js.map