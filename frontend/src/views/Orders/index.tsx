import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, TableCell, TableRow, Table as STable, TableBody } from 'semantic-ui-react';
import Product from '../../models/Product.model';
import { useStoresActions, useStoresState } from '../../providers/store';
import { priceFormat } from '../../shared/utils/priceFormat';
import Table from './components/Table';
import { OrderContainer } from './styles';

const Orders: React.FC = () => {
    const load = useStoresActions((action) => action.loadOrders);
    const loadProducts = useStoresActions(action => action.loadProducts);
    const create = useStoresActions(action => action.createOrder);
    const orders = useStoresState(state => state.orders);
    const products = useStoresState(state => state.products);

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        client_name: '',
        products: [] as string[]
    });
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProductsList, setSelectedProductsList] = useState<Product[]>([]);


    useEffect(() => {
        load();
        loadProducts();
    }, [load, loadProducts]);

    useEffect(() => {
        setFormData({ ...formData, products: selectedProductsList.map(products => products._id) });
    }, [selectedProductsList]);

    const handleAddProduct = useCallback(() => {
        const product = products.find(p => p.name === selectedProduct);
        if (product) {
            setSelectedProductsList([...selectedProductsList, product]);
            setSelectedProduct('');
        }
    }, [products, selectedProduct]);

    return (
        <OrderContainer>
            <h2>Pedidos</h2>
            <button onClick={() => setOpen(!open)}>
                Realizar pedido
            </button>
            <Table orders={orders} />
            <Modal open={open}>
                <Modal.Header>Cadastrar produto</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Nome do cliente</label>
                                <input placeholder='Ex: João Carlos' onChange={({ target }) => setFormData({ ...formData, client_name: target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    list='products'
                                    onChange={(e, { value }) => setSelectedProduct(value)}
                                    placeholder='Escolha o produto...'
                                    label={<Button onClick={handleAddProduct} icon='plus' />}
                                />
                                <datalist defaultValue={selectedProduct} id='products'>
                                    {products.map((product) => (
                                        <option key={product._id} value={product.name}>{product.name}</option>
                                    ))}
                                </datalist>
                            </Form.Field>
                            <STable striped celled>
                                <TableBody>
                                    {selectedProductsList.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                {priceFormat(product.price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {selectedProductsList.length > 0 &&
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>
                                                Total: R$ {priceFormat(selectedProductsList.reduce((acc, current) => acc + current.price, 0))}
                                            </TableCell>
                                        </TableRow>}
                                </TableBody>
                            </STable>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        content="Criar"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {
                            create(formData);
                            setFormData({ client_name: '', products: [] as string[] });
                            setOpen(false);
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </OrderContainer>
    );
}

export default Orders;