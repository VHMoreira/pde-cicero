import { Product } from "../../product/models/Product.model";
import OrderModel, { Order } from "../models/Order.model";

interface Query {
    status?: string;
}
export default class ShowProductsListService {
    public static async execute(status: string): Promise<Order[]> {

        let query: Query = {};

        if (status) {
            query.status = status;
        }

        const orders = await OrderModel.find(query).populate({ path: 'products', model: Product });

        return orders;
    }
}