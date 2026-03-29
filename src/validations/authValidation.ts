import Joi from 'joi';

export const requestOtpSchema = Joi.object({
    email: Joi.string().email().required()
});

export const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required()
});

export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').default('EMPLOYEE'),
    tenantName: Joi.string().min(2).max(100).optional().allow(''),
    verificationToken: Joi.string().required(),
    avatar: Joi.string().optional(),
    phone: Joi.string().optional().allow('')
}).unknown();

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
