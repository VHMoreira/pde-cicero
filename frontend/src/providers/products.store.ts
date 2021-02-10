import { createStore, createTypedHooks } from 'easy-peasy';
import Product from '../models/Product.model';

interface StoreProductModel {
    teste: string;
    products: Product[];
}

export const storeProducts = createStore<StoreProductModel>({
    products: [],
    teste: 'Texto de teste'
});

const typedHooks = createTypedHooks<StoreProductModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;