import { Router } from 'express';
import ProductRoutes from '../modules/product/routes'
// import UsersRoutes from '../modules/users/routes';

const routes = Router();

routes.use(ProductRoutes);
// routes.use(UsersRoutes);

export default routes;