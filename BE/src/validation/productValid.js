import Joi from 'joi'
export const productValid = Joi.object({
    name: Joi.string().required().min(3).max(255).messages({
      "string.base": "Tên phải là một chuỗi!",
      "string.empty": "Tên không được để trống!",
      "string.min": "Tên phải có ít nhất 3 ký tự!",
      "string.max": "Tên không được quá 255 ký tự!",
    }),
    price: Joi.number().required().min(0).messages({
        "string.base": "Giá phải là một số!",
        "string.empty": "Giá không được để trống!",
        "string.max": "Giá không được quá 255 ký tự!",
    }),
    image: Joi.string().required().min(0).messages({
        "string.empty": "Ảnh không được để trống!",
    }),
    category: Joi.string().messages({
      "string.base": "Danh mục phải là một chuỗi!",
    }),
    count: Joi.number().min(1).max(1000).messages({
      "number.base": "Số lượng phải là một số!",
      "number.empty": "Số lượng không được để trống!",
      "number.min": "Số lượng phải có ít nhất 1!",
    }),
}).unknown();
  