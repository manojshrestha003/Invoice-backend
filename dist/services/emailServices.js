"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env["EMAIL_USER"],
        pass: process.env["EMAIL_PASS"],
    },
});
const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: `"Invoice Support" <${process.env["EMAIL_USER"]}>`,
        to: email,
        subject: 'Your Verification Code',
        text: `Your OTP for registration is: ${otp}. This code expires in 60 seconds.`,
        html: `<b>Your OTP for registration is: ${otp}</b><p>This code expires in 60 seconds.</p>`,
    };
    return transporter.sendMail(mailOptions);
};
exports.sendOTPEmail = sendOTPEmail;
//# sourceMappingURL=emailServices.js.map