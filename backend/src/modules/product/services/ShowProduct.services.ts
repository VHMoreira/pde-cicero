import AppError from "../../../infra/errors/AppError";
import ProductModel, { Product } from "../models/Product.model";

export default class ShowProductService {
    public static async execute(id: string): Promise<Product> {

        const product = await ProductModel.findById(id);

        if (!product) {
            throw new AppError('Produto não econtrado');
        }

        return product;
    }
}