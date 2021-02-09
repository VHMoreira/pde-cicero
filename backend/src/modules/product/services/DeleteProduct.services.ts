import AppError from "../../../infra/errors/AppError";
import ProductModel from "../models/Product.model";

export default class DeleteProductService {
    public static async execute(id: string): Promise<void> {
        await ProductModel.findByIdAndDelete(id);
    }
}