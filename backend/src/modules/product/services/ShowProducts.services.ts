import ProductModel, { Product } from "../models/Product.model";

interface Query {
    type?: string;
}
export default class ShowProductsListService {
    public static async execute(type: string): Promise<Product[]> {

        let query: Query = {};

        if (type) {
            query.type = type;
        }

        const products = await ProductModel.find(query);
        console.log(products);

        return products;
    }
}