import mongoose from "mongoose";


const ingredientSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        required: true,
      },
      wareHouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WareHouse',
        required: true
        },
    },
    { _id: false } 
);

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
        discount: {
            type: Number,
            default: 0,
            max: 100
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null
        },
        ingredients: 
            {
                type: [ingredientSchema],
                default: []
            }
        
    },
    { timestamps: true, versionKey: false, strictPopulate: false }
)
export default mongoose.model('Product', productSchema)