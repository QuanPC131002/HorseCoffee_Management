import Cart from "../models/Cart";


export const getCartByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({userId}).populate("products.productId")
        const cartData = {
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.productId.quantity
            }))
        }

        return res.status(200).json( cartData )
    } catch (error) {
        
    }
}
// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { userId, products, notes } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [], notes });
        }

        // Duyệt qua từng sản phẩm trong mảng products
        for (let product of products) {
            const { productId, quantity } = product;

            const existProductIndex = cart.products.findIndex(
                (item) => item.productId && item.productId.toString() === productId
            );

            if (existProductIndex !== -1) {
                cart.products[existProductIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        cart.notes = notes;

        await cart.save();

        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
            stack: error.stack,
        });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateProductQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body
    try {
        let cart = await Cart.findOne({ userId })
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }   
        
        const product = cart.products.find((item) => item.productId.toString() === productId)
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.quantity = quantity;
        await cart.save()

        return res.status(200).json({ cart });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
            stack: error.stack,
        });
    }
}
// Xóa sản phẩm trong giỏ hàng thuộc 1 user
export const removeItemCart = async (req, res, next) => {
    try {
      const {userId, productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ message: "ID is required" });
      }
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId
      );
      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Product not found in cart" });
      }
  
      cart.products.splice(productIndex, 1);
      await cart.save();
      return res
        .status(200)
        .json({ cart, message: "Remove successfully" });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
            stack: error.stack,
        });
    }
};

// Tăng số lượng
export const increaseItemQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        product.quantity++;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseItemQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find((item) => item.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (product.quantity > 1) {
            product.quantity--;
        }else {
            cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
