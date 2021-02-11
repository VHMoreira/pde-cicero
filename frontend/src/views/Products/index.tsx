import React, { useCallback, useEffect, useState } from 'react';
import { useStoresActions, useStoresState } from '../../providers/store';
import { ProductContainer } from './styles';
import Table from './components/Table';
import Modal from './components/Modal';
import Product from '../../models/Product.model';

const Products: React.FC = () => {
    const load = useStoresActions(action => action.loadProducts);
    const products = useStoresState(state => state.products);

    const [editableProduct, setEditableProduct] = useState<Product | undefined>()
    const [open, setOpen] = useState(false);

    const handleEditableProduct = useCallback((product: Product) => {
        setEditableProduct(product);
        setOpen(true);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (!open) {
            setEditableProduct(undefined);
        }
    }, [open])

    return (
        <ProductContainer>
            <h2>Produtos</h2>
            <button onClick={() => setOpen(!open)}>
                Cadastrar produto
            </button>
            <Table products={products} openEditModal={handleEditableProduct} />
            <Modal open={open} setOpen={setOpen} product={editableProduct} />
        </ProductContainer>
    );
}

export default Products;