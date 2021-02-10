import axios from 'axios';
import { Action, action, createStore, createTypedHooks, Thunk, thunk } from 'easy-peasy';
import Product from '../models/Product.model';

interface StoreProductModel {
    products: Product[];
    createProduct: Thunk<StoreProductModel, { name: string, price: number }>
    deleteProduct: Thunk<StoreProductModel, { id: string }>
    initialize: Action<StoreProductModel, Product[]>;
    loadProducts: Thunk<StoreProductModel, void>;
}

export const storeProducts = createStore<StoreProductModel>({
    products: [],
    initialize: action((state, payload) => {
        state.products = payload;
        console.log(payload);
    }),
    createProduct: thunk(async (actions, payload) => {
        await axios.post('http://localhost:8080/products', payload);
        actions.loadProducts();
    }),
    deleteProduct: thunk(async (actions, payload) => {
        await axios.delete(`http://localhost:8080/products/${payload.id}`);
        actions.loadProducts();
    }),
    loadProducts: thunk(async (actions, payload) => {
        const { data } = await axios.get('http://localhost:8080/products');
        actions.initialize(data);
    }),
});

const typedHooks = createTypedHooks<StoreProductModel>();

export const useStoreProductsActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreProductsState = typedHooks.useStoreState;