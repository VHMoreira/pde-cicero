import AppError from "../../../infra/errors/AppError";
import OrderModel, { Order } from "../models/Order.model";

interface OrderRequest {
    id: string;
    status: string;
}

export default class EditOrderService {
    public static async execute({ id, status }: OrderRequest): Promise<Order> {

        const order = await OrderModel.findById(id);

        if (!order) {
            throw new AppError('Produto não econtrado');
        }

        order.status = status;

        return await order.save();
    }
}