import Joi from 'joi';

export const createCustomerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().allow(null, ''),
    phone: Joi.string().allow(null, ''),
    address: Joi.string().allow(null, ''),
});

export const updateCustomerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().allow(null, ''),
    phone: Joi.string().allow(null, ''),
    address: Joi.string().allow(null, ''),
}).min(1);
