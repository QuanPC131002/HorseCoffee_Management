import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const createOrder = async (req, res) => {
    try {
        const { userId, orderItem, totalPrice, status, notes, orderDate } = req.body;

        const updatedWarehouses = [];

        // Kiểm tra và giảm tồn kho nguyên liệu dựa trên các sản phẩm trong đơn hàng
        for (const item of orderItem) {
            const product = await Product.findById(item.productId).populate("ingredients.wareHouse");
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found!` });
            }

            for (const ingredient of product.ingredients) {
                const warehouse = ingredient.wareHouse;
                if (!warehouse) {
                    return res.status(400).json({ message: `Warehouse for ingredient ${ingredient.name} not found!` });
                }

                const requiredQuantity = ingredient.count * item.quantity;
                if (warehouse.countInStock < requiredQuantity) {
                    return res.status(400).json({
                        message: `Not enough stock for ingredient ${ingredient.name} in warehouse!`,
                    });
                }

                // Lưu thông tin cần giảm
                updatedWarehouses.push({
                    warehouse,
                    quantityToDeduct: requiredQuantity,
                });
            }
        }

        
        const order = await Order.create({ userId, orderItem, totalPrice, status, notes, orderDate });
        
        for (const { warehouse, quantityToDeduct } of updatedWarehouses) {
            warehouse.countInStock -= quantityToDeduct;
            await warehouse.save();
        }

        
        await Cart.findOneAndDelete({ userId });

        return res.status(200).json({
            message: "Order created successfully!",
            order,
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name || "Error",
            message: error.message || "Server error",
        });
    }
};

    
export const getOrder = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 9; 
        const skip = (page - 1) * limit; 
        const total = await Order.countDocuments(); 

        const order = await Order.find().skip(skip).limit(limit).populate('userId', 'name role').exec();
        if((await order).length === 0 ){
            return res.status(404).json({ error: "No orders found" })
        }
        return res.status(200).json({
            order,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { userId, orderId } = req.params
        const order = await Order.findOne({ userId, _id: orderId }).populate('orderItem.productId', 'name');
        if(!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json(order)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateOrderStatus= async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body;

        const validStatus  = ['Processing', 'Completed', 'Canceled']
        if(!validStatus.includes(status)) {
            return res.status(400).json({ error: 'Invalid status'})
        }

        const order = await Order.findOne({ _id: orderId })
        if(!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if(order.status == 'Completed' || order.status == "Canceled") {
            return res.status(400).json({ error: "Order cannot be updated" });
        }
        order.status = status;
        await order.save();
        return res.status(200).json(order)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
