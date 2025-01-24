import Joi from "joi";

export const categoryValid = Joi.object({
  name: Joi.string().required().min(6).max(255).messages({
    "string.base": "Tên phải là một chuỗi!",
    "string.empty": "Tên không được để trống!",
    "string.min": "Tên phải có ít nhất 3 ký tự!",
    "string.max": "Tên không được quá 255 ký tự!",
  }),
  
}).unknown();