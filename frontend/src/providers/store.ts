import axios from 'axios';
import { Action, action, createStore, createTypedHooks, Thunk, thunk } from 'easy-peasy';
import Product from '../models/Product.model';
import Order from '../models/Order.model';

interface StoreModel {
    products: Product[];
    orders: Order[]
    createProduct: Thunk<StoreModel, { name: string, price: number }>
    deleteProduct: Thunk<StoreModel, { id: string }>
    initializeProduct: Action<StoreModel, []>;
    loadProducts: Thunk<StoreModel, void>;
    createOrder: Thunk<StoreModel, { client_name: string, products: string[] }>
    changeStatus: Thunk<StoreModel, { status: string, id: string }>
    initializeOrder: Action<StoreModel, []>;
    changeProductStatus: Action<StoreModel, { status: string, id: string }>;
    loadOrders: Thunk<StoreModel, void>;
}

export const stores = createStore<StoreModel>({
    products: [],
    initializeProduct: action((actions, payload) => {
        actions.products = payload;
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
        actions.initializeProduct(data);
    }),
    orders: [],
    initializeOrder: action((actions, payload) => {
        actions.orders = payload;
        console.log(payload);
    }),
    changeProductStatus: action((actions, payload) => {
        const order = actions.orders.find(order => order._id === payload.id);
        if (order) {
            order.status = payload.status;
        }
        console.log(payload);
    }),
    createOrder: thunk(async (actions, payload) => {
        await axios.post('http://localhost:8080/orders', payload);
        actions.loadOrders();
    }),
    changeStatus: thunk(async (actions, { status, id }) => {
        await axios.put(`http://localhost:8080/orders/${id}`, { status });
        actions.changeProductStatus({ status, id });
    }),
    loadOrders: thunk(async (actions, payload) => {
        const { data } = await axios.get('http://localhost:8080/orders');
        actions.initializeOrder(data);
    }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoresActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoresState = typedHooks.useStoreState;