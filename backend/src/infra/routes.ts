import { Router } from 'express';
import ProductRoutes from '../modules/product/routes'
import OrderRoutes from '../modules/order/routes';

const routes = Router();

routes.use(ProductRoutes);
routes.use(OrderRoutes);

export default routes;