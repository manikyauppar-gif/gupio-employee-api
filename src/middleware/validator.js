import Joi from 'joi';

export const employeeCreateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  department: Joi.string().trim().min(2).max(50).required(),
  designation: Joi.string().trim().min(2).max(50).required(),
});

export const employeeUpdateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().email(),
  department: Joi.string().trim().min(2).max(50),
  designation: Joi.string().trim().min(2).max(50),
}).min(1);

export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map((d) => d.message),
    });
  }
  req.body = value;
  next();
};