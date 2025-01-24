import { categoryValid } from "../validation/categoryValid";
import { productValid } from "../validation/productValid"
import { wareHouseValid } from "../validation/wareValid";

export const checkBodyRequestProduct = (req, res, next) => {
    try {
        const { error } = productValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((item) => item.message);
            return res.status(400).json({
                message: errors,
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error"})
    }
}

export const checkBodyRequestCategory = (req, res, next) => {
    try {
        const { error } = categoryValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((item) => item.message);
            return res.status(400).json({
                message: errors,
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error"})
    }
}

export const checkBodyRequestWareHouse = (req, res, next) => {
    try {
        const { error } = wareHouseValid.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((item) => item.message);
            return res.status(400).json({
                message: errors,
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error"})
    }
}