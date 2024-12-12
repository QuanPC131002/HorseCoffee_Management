import Product from "../models/Product"

export const createProduct = async (req, res) => {
    try {
        const data = await Product.create(req.body);
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
        const data = await Product.findById(req.params.id)
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