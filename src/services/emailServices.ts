import nodemailer from "nodemailer";
import dns from "dns";

// Tell Node.js to prioritize IPv4 over IPv6 to fix Render ENETUNREACH errors
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env["EMAIL_USER"],
        pass: process.env["EMAIL_PASS"],
    },
    // Force IPv4 specifically for the SMTP connection
    tls: {
        rejectUnauthorized: false
    },
    family: 4
} as any);

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
