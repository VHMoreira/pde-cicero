import { Router } from 'express';
import OrdersController from '../controllers/order.controllers';

const ordersRouter = Router();
const ordersController = new OrdersController();


ordersRouter.route('/')
    .get(ordersController.index)
    .post(ordersController.create);

ordersRouter.route('/:id')
    .get(ordersController.show)
    .put(ordersController.edit);

export default ordersRouter;