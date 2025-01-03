import Order from "../models/Order";
import Cart from "../models/Cart";

export const createOrder = async (req, res) => {
    try {
        const { userId, orderItem, totalPrice, status, notes, orderDate } = req.body;
        const order = await Order.create({ userId, orderItem, totalPrice, status, notes, orderDate })
        await Cart.findOneAndDelete({userId})
        return res.status(200).json(order)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
    
export const getOrder = async (req, res) => {
    try {
        const order = await Order.find();
        if((await order).length === 0 ){
            return res.status(404).json({ error: "No orders found" })
        }
        return res.status(200).json(order)
        
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
