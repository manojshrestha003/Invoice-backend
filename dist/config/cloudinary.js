"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
    api_key: process.env['cloudinary_Api_key'],
    api_secret: process.env['cloudinary_Api_secret'],
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'user_avatars',
        format: async (_req, _file) => 'png', // or keep original form
        public_id: (_req, _file) => `avatar-${Date.now()}`,
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map