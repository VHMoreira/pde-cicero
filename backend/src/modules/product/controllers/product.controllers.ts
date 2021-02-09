import { Request, Response } from 'express'
import ProductModel from "../models/Product.model";
import CreateProductService from '../services/CreateProduct.services';
import DeleteProductService from '../services/DeleteProduct.services';
import EditProductService from '../services/EditProduct.services';
import ShowProductService from '../services/ShowProduct.services';
import ShowProductsListService from '../services/ShowProducts.services';

export default class ProductControllers {
    public async index(req: Request, res: Response): Promise<Response> {
        const { type } = req.query;
        try {
            const products = await ShowProductsListService.execute(type as string);
            return res.json(products);
        } catch (error) {
            return res.json(error);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, category, price } = req.body;
        try {
            const createdProduct = await CreateProductService.execute({ name, category, price })
            return res.json(createdProduct);
        } catch (error) {
            return res.json(error);
        }
    }

    public async exclude(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await DeleteProductService.execute(id);
            return res.json();
        } catch (error) {
            return res.json(error);
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const product = await ShowProductService.execute(id);
            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, category, price } = req.body;
        try {
            const product = await EditProductService.execute({ id, name, category, price });
            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    }
}