"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = exports.verifyOtpSchema = exports.requestOtpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.requestOtpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required()
});
exports.verifyOtpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    otp: joi_1.default.string().length(6).required()
});
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).required(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').default('EMPLOYEE'),
    tenantName: joi_1.default.string().min(2).max(100).optional().allow(''),
    verificationToken: joi_1.default.string().required(),
    avatar: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional().allow('')
}).unknown();
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
//# sourceMappingURL=authValidation.js.map