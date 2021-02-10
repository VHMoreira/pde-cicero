import { Router } from 'express';
import ProductsController from '../controllers/product.controllers';

const productsRouter = Router();
const productsController = new ProductsController();


productsRouter.route('/')
    .get(productsController.index)
    .post(productsController.create);

productsRouter.route('/:id')
    .get(productsController.show)
    .put(productsController.edit)
    .delete(productsController.exclude);

export default productsRouter;