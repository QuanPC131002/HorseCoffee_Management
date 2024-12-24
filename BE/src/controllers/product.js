import Product from "../models/Product"
import Ware from "../models/Ware";

export const createProduct = async (req, res) => {
    try {
        const {wareHouse, countInStock }= req.body
        const warehouseData = await Ware.findById(wareHouse);
        if (!warehouseData) {
            return res.status(404).json({ message: "Warehouse not found!" });
        }

        if (countInStock && warehouseData.countInStock < countInStock) {
            return res.status(400).json({ message: "Not enough stock in the warehouse!" });
        }

        // Cập nhật số lượng trong kho sau khi tạo sản phẩm mới
        if (countInStock) {
            warehouseData.countInStock -= countInStock;
            await warehouseData.save();
        }

        const data = await Product.create({...req.body, wareHouse} );
        if (!data) {
            return res.status(404).json({
              message: "Create failed!",
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

export const getAllProducts = async (req, res) => {
    try {
        const data = await Product.find({})
        if (!data) {
            return res.status(404).json({
              message: "No Products!",
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

export const getOneProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("warehouse", "name unit countInStock");

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