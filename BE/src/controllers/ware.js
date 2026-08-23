import Ware from "../models/Ware.js";

export const createWareHouse = async (req, res) => {
    try {
        const data = await Ware.create(req.body);
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


export const getAllWareHouse = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 9; 
        const skip = (page - 1) * limit; 
        const total = await Ware.countDocuments(); 

        const data = await Ware.find({}).sort({createdAt: -1}).skip(skip).limit(limit)
        if(!data){
            return res.status(404).json({
              message: "Get All WareHouse failed!",
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

export const getOneWareHouse = async (req, res) => {
    try {
        const data = await Ware.findById(req.params.id)
        if(!data){
            return res.status(404).json({
              message: "Get One WareHouse failed!",
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



export const updateWareHouse = async (req, res) => {
    try {
        const data = await Ware.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
        if(!data){
            return res.status(404).json({
              message: "Update WareHouse failed!",
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

export const removeWareHouse = async (req, res) => {
    try {
        const data = await Ware.findByIdAndDelete({ _id: req.params.id})
        if(!data){
            return res.status(404).json({
              message: "Delete WareHouse failed!",
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