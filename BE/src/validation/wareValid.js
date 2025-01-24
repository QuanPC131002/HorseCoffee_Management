import Joi from "joi";

export const wareHouseValid = Joi.object({
  name: Joi.string().required().min(6).max(255).messages({
    "string.base": "Tên phải là một chuỗi!",
    "string.empty": "Tên không được để trống!",
    "string.min": "Tên phải có ít nhất 6 ký tự!",
    "string.max": "Tên không được quá 255 ký tự!",
  }),
  countInStock: Joi.number().required().min(1).max(255).messages({
    "number.base": "Số lượng trong kho phải là một số!",
    "number.empty": "Số lượng trong kho không được để trống!",
    "number.min": "Số lượng trong kho phải có ít nhất 1!",
  }),
  unit: Joi.string().required().min(1).max(20).messages({
    "string.base": "Đơn vị phải là một chuỗi!",
    "string.empty": "Đơn vị không được để trống!",
    "string.min": "Đơn vị phải có ít nhất 1 ký tự!",
    "string.max": "Đơn vị không được quá 20 ký tự!",
  })
}).unknown();