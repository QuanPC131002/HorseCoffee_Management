import mongoose from "mongoose";
import Product from "../models/Product.js"
import Ware from "../models/Ware.js";

export const createProduct = async (req, res) => {
    try {
        const { ingredients } = req.body;

        
        const updatedWarehouses = [];

        if (ingredients && ingredients.length > 0) {
            for (const ingredient of ingredients) {
                if (!ingredient.wareHouse) {
                    return res.status(400).json({ message: "Ingredient warehouse is required!" });
                }
                const warehouseIngredient = await Ware.findById(ingredient.wareHouse);
                if (!warehouseIngredient) {
                    return res.status(404).json({ message: `Ingredient warehouse ${ingredient.wareHouse} not found!` });
                }

                if (warehouseIngredient.countInStock < ingredient.count) {
                    return res.status(400).json({
                        message: `Not enough stock for ingredient ${ingredient.name} in warehouse!`,
                    });
                }

                updatedWarehouses.push({
                    warehouseIngredient,
                    count: ingredient.count,
                });
            }
        }

        const data = await Product.create(req.body);
        if (!data) {
            return res.status(404).json({ message: "Create failed!" });
        }

        for (const { warehouseIngredient, count } of updatedWarehouses) {
            warehouseIngredient.countInStock -= count;
            await warehouseIngredient.save();
        }

        return res.status(200).json({
            message: "Successfully!",
            data: data,
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

        const data = await Product.find({}).sort({createdAt: -1}).skip(skip).limit(limit)
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
        const { ingredients } = req.body;

        const product = await Product.findById(req.params.id).populate("ingredients.wareHouse");
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        const initialIngredients = product.ingredients || [];
        const updatedWarehouses = [];
        const restoredWarehouses = [];

        if (ingredients && ingredients.length > 0) {
            for (const ingredient of ingredients) {
                if (!ingredient.wareHouse) {
                    return res.status(400).json({ message: "Ingredient warehouse is required!" });
                }
                const warehouseIngredient = await Ware.findById(ingredient.wareHouse);
                if (!warehouseIngredient) {
                    return res.status(404).json({ message: `Ingredient warehouse ${ingredient.wareHouse} not found!` });
                }

                const existingIngredient = initialIngredients.find(
                    (item) => item.wareHouse.toString() === ingredient.wareHouse
                );

                if (existingIngredient) {
                    // Nếu nguyên liệu đã tồn tại, tính chênh lệch số lượng
                    const diff = ingredient.count - existingIngredient.count;
                    if (diff > 0 && warehouseIngredient.countInStock < diff) {
                        return res.status(400).json({
                            message: `Not enough stock for ingredient ${ingredient.name} in warehouse!`,
                        });
                    }
                    warehouseIngredient.countInStock -= diff;
                } else {
                    // Nguyên liệu mới
                    if (warehouseIngredient.countInStock < ingredient.count) {
                        return res.status(400).json({
                            message: `Not enough stock for ingredient ${ingredient.name} in warehouse!`,
                        });
                    }
                    warehouseIngredient.countInStock -= ingredient.count;
                }

                updatedWarehouses.push(warehouseIngredient);
            }
        }

        // Xử lý nguyên liệu bị xóa
        for (const ingredient of initialIngredients) {
            if (!ingredients.find((item) => item.wareHouse.toString() === ingredient.wareHouse.toString())) {
                const warehouseIngredient = await Ware.findById(ingredient.wareHouse);
                if (warehouseIngredient) {
                    warehouseIngredient.countInStock += ingredient.count;
                    restoredWarehouses.push(warehouseIngredient);
                }
            }
        }

        const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                message: "Update Product failed!",
            });
        }

        for (const warehouse of [...updatedWarehouses, ...restoredWarehouses]) {
            await warehouse.save();
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
};


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