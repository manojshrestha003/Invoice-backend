// src/services/otpService.ts
import prisma from '../config/database';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const MAX_ATTEMPTS = 5;

/** 
 * Generates a 6-digit OTP, hashes it, and saves it to the database.
 */
export const generateAndSaveOTP = async (email: string) => {
    // 1. Generate a random 6-digit code
    const otp = crypto.randomInt(100000, 999999).toString();

    // 2. Hash the OTP for security
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 60 * 1000); // 10 minutes

    // 3. Upsert: update existing OTP or create a new one
    await prisma.verificationOTP.upsert({
        where: { email },
        update: { otpHash, attempts: 0, expiresAt },
        create: { email, otpHash, expiresAt },
    });

    return otp; // Return the plain text OTP to send it via email
};

/**
 * Verifies the OTP by comparing the hash and checking attempts.
 */
export const verifySecureOTP = async (email: string, plainOtp: string) => {
    const record = await prisma.verificationOTP.findUnique({ where: { email } });

    if (!record) throw new Error('OTP not found for this email.');
    if (new Date() > record.expiresAt) throw new Error('OTP has expired.');
    if (record.attempts >= MAX_ATTEMPTS) throw new Error('Too many failed attempts. Please request a new code.');

    const isMatch = await bcrypt.compare(plainOtp, record.otpHash);

    if (!isMatch) {
        await prisma.verificationOTP.update({
            where: { email },
            data: { attempts: { increment: 1 } }
        });
        throw new Error('OTP is not matched ');
    }

    return true; // Verification passed!
};
