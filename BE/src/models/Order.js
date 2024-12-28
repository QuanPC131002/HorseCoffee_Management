import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItem: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                }

            }
        ],
        totalPrice: {
            type:Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Processing', 'Completed', 'Canceled'],
        },
        notes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        },
        orderDate: {
            type: Date,
            default: Date.now, 
        },
    }
)

export default mongoose.model('Order', orderSchema)