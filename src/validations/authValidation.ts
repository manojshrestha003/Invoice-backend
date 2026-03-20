import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').default('EMPLOYEE'),
    tenantName: Joi.string().min(2).max(100).optional().allow(''),
    tenantId: Joi.string().uuid().optional().allow(''),
    avatar: Joi.string().optional()
});
