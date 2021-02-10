import AppError from "../../../infra/errors/AppError";
import { Product } from "../../product/models/Product.model";
import OrderModel, { Order } from "../models/Order.model";

export default class ShowProductService {
    public static async execute(id: string): Promise<Order> {

        const order = await OrderModel.findById(id).populate({ path: 'products', model: Product });

        if (!order) {
            throw new AppError('Produto não econtrado');
        }

        return order;
    }
}