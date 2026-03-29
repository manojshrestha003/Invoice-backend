/**
 * Generates a 6-digit OTP, hashes it, and saves it to the database.
 */
export declare const generateAndSaveOTP: (email: string) => Promise<string>;
/**
 * Verifies the OTP by comparing the hash and checking attempts.
 */
export declare const verifySecureOTP: (email: string, plainOtp: string) => Promise<boolean>;
//# sourceMappingURL=otpService.d.ts.map