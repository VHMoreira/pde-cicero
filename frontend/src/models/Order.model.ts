import Product from "./Product.model";

export default interface Order {
    _id: string;
    total: number;
    client_name: string
    status: string
    created_at: Date
    products: Product[]
}