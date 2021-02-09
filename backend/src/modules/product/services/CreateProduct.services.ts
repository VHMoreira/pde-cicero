import ProductModel, { Product } from "../models/Product.model";

interface ProductRequest {
    name: string;
    price: number;
    category: string;
}

export default class CreateProductService {
    public static async execute({ name, price, category }: ProductRequest): Promise<Product> {

        const newProduct = await ProductModel.create({
            name,
            price,
            category
        });

        return await newProduct.save();
    }
}