import mongoose from "mongoose";
import Product from "../models/Product"
import Ware from "../models/Ware";

export const createProduct = async (req, res) => {
    try {
        const { ingredients } = req.body;
        if (ingredients && ingredients.length > 0) {
            for (const ingredient of ingredients) {
                const warehouseIngredient = await Ware.findById(ingredient.wareHouse);
                if (!warehouseIngredient) {
                    return res.status(404).json({ message: `Ingredient warehouse ${ingredient.wareHouse} not found!` });
                }

                if (warehouseIngredient.countInStock < ingredient.count) {
                    return res.status(400).json({
                        message: `Not enough stock for ingredient ${ingredient.name} in warehouse!`,
                    });
                }

                warehouseIngredient.countInStock -= ingredient.count;
                await warehouseIngredient.save();
            }
        }

        const productData = await Product.create(req.body);
        if (!productData) {
            return res.status(404).json({ message: "Create failed!" });
        }

        return res.status(200).json({
            message: "Successfully!",
            data: productData,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 9; 
        const skip = (page - 1) * limit;

        const total = await Product.countDocuments(); 

        const data = await Product.find({}).skip(skip).limit(limit)
        if (!data) {
            return res.status(404).json({
              message: "No Products!",
            });
        }
        return res.status(200).json({
            message: "Successfully!",
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });   
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
}

export const getOneProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("ingredients.warehouse", "name unit countInStock");
        
        const data = await Product.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
              message: "No Products!",
              products
            });
        }
        return res.status(200).json({
            message: "Successfully!",
            data,
        });   
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
        if(!data){
            return res.status(404).json({
              message: "Update Product failed!",
            });
          }
        return res.status(200).json({
            message: "Successfully!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
}

export const removeProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete({ _id: req.params.id})
        if(!data){
            return res.status(404).json({
              message: "Delete Product failed!",
            });
          }
        return res.status(200).json({
            message: "Successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
}

export const related = async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.categoryId,
        });
  
      return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
};