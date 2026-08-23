import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config()
const { SECRET_CODE } = process.env
export const checkIsAdmin = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Chưa đăng nhập!",
      });
    }

    const decoded = jwt.verify(token, SECRET_CODE);
    console.log(decoded);
    
    if (!decoded) {
      return res.status(401).json({
        message: "Token không hợp lệ!",
      });
    }
    const checkUser = await User.findById(decoded.id);
    if (!checkUser) {
      return res.status(404).json({
        message: "Không tồn tại người dùng",
      });
    }

    if (checkUser.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không phải admin!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};