import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ['member','cash','admin'],
            default: 'member'
        },
        otp: {
            type: String,
        },
        otpCreatedAt: {
            type: Date,
        },
    },
    { timestamps: true, versionKey: false }
)

export default mongoose.model('User', userSchema)