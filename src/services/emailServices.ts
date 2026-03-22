import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env["EMAIL_USER"],
        pass: process.env["EMAIL_PASS"],
    },
});

export const sendOTPEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: `"Invoice Support" <${process.env["EMAIL_USER"]}>`,
        to: email,
        subject: 'Your Verification Code',
        text: `Your OTP for registration is: ${otp}. This code expires in 60 seconds.`,
        html: `<b>Your OTP for registration is: ${otp}</b><p>This code expires in 60 seconds.</p>`,
    };
    return transporter.sendMail(mailOptions);
};
