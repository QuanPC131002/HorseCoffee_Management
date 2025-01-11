import Category from "../models/Category"
import Product from "../models/Product";

export const createCategory = async (req, res) => {
    try {
      
      const data = await Category.create(req.body);
      if(!data){
        return res.status(404).json({
          message: "Create category failed!",
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
  };

export const getAllCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 9; 
        const skip = (page - 1) * limit; 
        const total = await Category.countDocuments(); 
      
        const data = await Category.find({}).skip(skip).limit(limit)
        if(!data){
            return res.status(404).json({
              message: "Get All Category failed!",
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

export const getOneCategory = async (req, res) => {
    try {
        const product = await Product.find({ category: req.params.id});
        const data = await Category.findById(req.params.id)
        if(!data){
            return res.status(404).json({
              message: "Get One Category failed!",
            });
          }
        return res.status(200).json({
            message: "Successfully!",
            data,
            product
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
}


export const getOneCategoryBySlug = async (req, res) => {
    try {
      const data = await Category.findOne({ slug: req.params.slug});
      if (!data) {
        return res.status(404).json({
          message: "No Categories!",
        });
      }
      return res.status(200).json({
        message: "Successfully!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
};
  
export const getOneCategoryByName = async (req, res) => {
    try {
      const data = await Category.findOne({ name: req.params.name});
      if (!data) {
        return res.status(404).json({
          message: "No Categories!",
        });
      }
      return res.status(200).json({
        message: "Successfully!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const data = await Category.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
        if(!data){
            return res.status(404).json({
              message: "Update Category failed!",
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

export const removeCategory = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete({ _id: req.params.id})
        if(!data){
            return res.status(404).json({
              message: "Delete Category failed!",
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