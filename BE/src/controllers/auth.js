import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User";
dotenv.config();

const { SECRET_CODE, SEND_OTP_EMAIL, SEND_OTP_EMAIL_PASSWORD } = process.env;
export const signUp = async (req, res) => {
    try {
      const body = req.body;
      const { name, email, password, phone, role } = body;

      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({
          message: "Email already exists!",
        });
      }
  
      const hashPassword = await bcrypt.hash(password, 10);
      if (!hashPassword) {
        return res.status(400).json({
          message: "Password is not hashed!",
        });
      }
  
      const user = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
        role,
      });
  
      user.password = undefined;
      return res.status(200).json({
        message: "Successfully!",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name || "Error",
        message: error.message || "Server error!",
      });
    }
  };
  
export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return res.status(400).json({
          message: "Email does not exist!",
        });
      }
  
      const checkPassword = await bcrypt.compare(password, checkUser.password);
  
      if (!checkPassword) {
        return res.status(400).json({
          message: "Password is incorrect!",
        });
      }
  
      const accessToken = jwt.sign({ id: checkUser._id }, SECRET_CODE, {
        expiresIn: "1d",
      });
      if (!accessToken) {
        return res.status(400).json({
          message: "Access token is not created!",
        });
      }
  
      checkUser.password = undefined;
      return res.status(200).json({
        message: "Successfully!",
        accessToken,
        user: checkUser,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name || "Error",
        message: error.message || "Server error!",
      });
    }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const checkEmail = await User.findOne({ email })
    if(!checkEmail) {
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    checkEmail.otp = otp;
    await checkEmail.save();
   
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: SEND_OTP_EMAIL,
        pass: SEND_OTP_EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: SEND_OTP_EMAIL,
      to: email,
      subject: "Quên mật khẩu - OTP của bạn",
      text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 10 phút.`,
    }

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP đã được gửi đến email của bạn!" });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
     // Kiểm tra xem email có tồn tại không
    const user = await User.findOne({ email})
    if(!user) {
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }
     // Kiểm tra OTP
    if(user.otp !== otp) {
      return res.status(404).json({
        message: "OTP không tồn tại",
      });
    }
     // Mã hóa mật khẩu mới
    const hashPassword = await bcrypt.hash(newPassword, 10)
     // Cập nhật mật khẩu và xóa OTP
    user.password = hashPassword
    user.otp = null
    await user.save()
    res.status(200).json({ message: "Mật khẩu đã được cập nhật thành công!" });
  } catch (error) {
    return res.status(500).json({
        name: error.name || "Error",
        message: error.message || "Server error!",
      });
  }
}

export const changePassword = async (req, res) => {
  try {
    const {email, oldPassword, newPassword } = req.body
    const user = await User.findOne({ email})
    if(!user) {
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }
    const checkPassword = await bcrypt.compare(oldPassword, user.password)
    if(!checkPassword) {
      return res.status(404).json({
        message: "Mật khẩu cũ không đúng",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashPassword
    await user.save()

    res.status(200).json({ message: "Đổi mật khẩu thành công!" });

  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('token'); 

    res.status(200).json({ message: "Đăng xuất thành công!" });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const data = await User.findOne({_id: req.params.id})
    if(!data) {
      return res.status(400).json({message: 'User not found'})
    } else {
      return res.status(200).json({ message: 'User successfully', data})
    }
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
}
