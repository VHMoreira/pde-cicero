import { Types } from "mongoose";
import ProductModel from "../../product/models/Product.model";
import OrderModel, { Order } from "../models/Order.model";

interface ProductRequest {
    client_name: string;
    products: Types.ObjectId[];
}

export default class CreateProductService {
    public static async execute({ client_name, products }: ProductRequest): Promise<Order> {
        const promisses = products.map(async (p) => {
            return await ProductModel.findById(p);
        });

        const productsFinded = await Promise.all(promisses);

        const total = productsFinded.reduce((acc, curr) => acc + curr.price, 0);

        const newOrder = await OrderModel.create({
            client_name,
            total,
            products,
            created_at: new Date(),
            status: 'on_progress'
        });

        return await newOrder.save();
    }
}