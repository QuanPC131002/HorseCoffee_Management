import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number
        },
        role: {
            type: String,
            default: 'member'
        }
    },
    { timestamps: true, versionKey: false }
)

export default mongoose.model('User', userSchema)