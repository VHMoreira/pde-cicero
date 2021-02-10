import { Request, Response } from 'express'
import OrderModel from "../models/Order.model";
import CreateOrderService from '../services/CreateOrder.services';
import EditOrderService from '../services/EditOrder.services';
import ShowOrderService from '../services/ShowOrder.services';
import ShowOrdersListService from '../services/ShowOrders.services';

export default class OrderControllers {
    public async index(req: Request, res: Response): Promise<Response> {
        const { status } = req.query;
        try {
            const orders = await ShowOrdersListService.execute(status as string);
            return res.json(orders);
        } catch (error) {
            return res.json(error);
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { client_name, products } = req.body;
        try {
            const createdOrder = await CreateOrderService.execute({ client_name, products })
            return res.json(createdOrder);
        } catch (error) {
            return res.json(error);
        }
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const order = await ShowOrderService.execute(id);
            return res.json(order);
        } catch (error) {
            return res.json(error);
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const order = await EditOrderService.execute({ id, status });
            return res.json(order);
        } catch (error) {
            return res.json(error);
        }
    }
}