import mongoose from "mongoose";

const wareSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        countInStock: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
)

export default mongoose.model('WareHouse', wareSchema)