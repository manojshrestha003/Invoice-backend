"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerSchema = exports.createCustomerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCustomerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().allow(null, ''),
    phone: joi_1.default.string().allow(null, ''),
    address: joi_1.default.string().allow(null, ''),
});
exports.updateCustomerSchema = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email().allow(null, ''),
    phone: joi_1.default.string().allow(null, ''),
    address: joi_1.default.string().allow(null, ''),
}).min(1);
//# sourceMappingURL=customerValidation.js.map