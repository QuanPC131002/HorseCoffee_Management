import Joi from 'joi'
export const productValid = Joi.object({
    name: Joi.string().required().min(6).max(255).messages({
      "string.base": "Name phải là một chuỗi!",
      "string.empty": "Name không được để trống!",
      "string.min": "Name phải có ít nhất 6 ký tự!",
      "string.max": "Name không được quá 255 ký tự!",
    }),
    price: Joi.number().required().min(0).messages({
        "string.base": "Price phải là một số!",
        "string.empty": "Price không được để trống!",
        "string.max": "Price không được quá 255 ký tự!",
    }),
    image: Joi.number().required().min(0).messages({
        "string.empty": "Ảnh không được để trống!",
    }),
    category: Joi.string().messages({
      "string.base": "Category phải là một chuỗi!",
    }),
}).unknown();
  