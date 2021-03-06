import axios from 'axios';
import { Action, action, createStore, createTypedHooks, Thunk, thunk } from 'easy-peasy';
import Product from '../models/Product.model';
import Order from '../models/Order.model';

interface StoreModel {
    products: Product[];
    createProduct: Thunk<StoreModel, { name: string, price: number, category: string }>
    editProduct: Thunk<StoreModel, { _id: string, name: string, price: number, category: string }>
    deleteProduct: Thunk<StoreModel, { id: string }>
    initializeProduct: Action<StoreModel, []>;
    loadProducts: Thunk<StoreModel, void>;
    orders: Order[];
    createOrder: Thunk<StoreModel, { client_name: string, products: string[] }>
    changeStatus: Thunk<StoreModel, { status: string, id: string }>
    initializeOrder: Action<StoreModel, []>;
    changeProductStatus: Action<StoreModel, { status: string, id: string }>;
    loadOrders: Thunk<StoreModel, void>;
    sales: Order[];
    initializeSales: Action<StoreModel, []>;
    loadSales: Thunk<StoreModel, void>;
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
    editProduct: thunk(async (actions, payload) => {
        await axios.put(`http://localhost:8080/products/${payload._id}`, {
            name: payload.name,
            category: payload.category,
            price: payload.price
        });
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
        console.log(payload);
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
    sales: [],
    initializeSales: action((actions, payload) => {
        actions.sales = payload;
        console.log(payload);
    }),
    loadSales: thunk(async (actions, payload) => {
        const { data } = await axios.get(`http://localhost:8080/orders?status=confirmed`);
        actions.initializeSales(data);
    }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoresActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoresState = typedHooks.useStoreState;