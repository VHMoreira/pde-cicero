import AppError from "../../../infra/errors/AppError";
import ProductModel, { Product } from "../models/Product.model";

interface ProductRequest {
    id: string;
    name: string;
    price: number;
    category: string;
}

export default class EditProductService {
    public static async execute({ id, name, category, price }: ProductRequest): Promise<Product> {

        const product = await ProductModel.findById(id)

        if (!product) {
            throw new AppError('Produto não econtrado');
        }

        name && (product.name = name);
        category && (product.category = category);
        price && (product.price = price);

        return await product.save();
    }
}