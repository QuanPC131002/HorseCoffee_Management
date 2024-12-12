import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            enum: [0,1],
            default: 0
        },
        featured: {
            type: Boolean,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null
        },
        wareHouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WareHouse',
            default: null
        }
    },
    { timestamps: true, versionKey: false }
)
export default mongoose.model('Product', productSchema)