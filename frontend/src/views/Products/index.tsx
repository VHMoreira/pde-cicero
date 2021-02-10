import React, { useEffect, useState } from 'react';
import { useStoreProductsActions, useStoreProductsState } from '../../providers/products.store';
import { ProductContainer } from './styles';
import Table from '../../shared/components/Table';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

const Products: React.FC = () => {
    const load = useStoreProductsActions(action => action.loadProducts);
    const create = useStoreProductsActions(action => action.createProduct);
    const products = useStoreProductsState(state => state.products);

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: 0
    });


    useEffect(() => {
        load();
    }, []);
    return (
        <ProductContainer>
            <button onClick={() => setOpen(!open)}>
                Cadastrar produto
            </button>
            <Table products={products} />
            <Modal open={open}>
                <Modal.Header>Cadastrar produto</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Nome do produto</label>
                                <input placeholder='Ex: Arroz com frango' onChange={({ target }) => setFormData({ ...formData, name: target.value })} />
                            </Form.Field>
                            <Form.Select
                                fluid
                                label='Categoria'
                                options={[
                                    { key: 'p', text: 'Principal', value: 'principal' },
                                    { key: 's', text: 'Sobremesa', value: 'sobremesa' },
                                    { key: 'l', text: 'Lanche', value: 'lanche' },
                                    { key: 'b', text: 'Bebidas', value: 'bebidas' },
                                ]}
                                placeholder='Categoria'
                                onChange={(e, { value }) => setFormData({ ...formData, category: String(value) })}
                            />
                            <Form.Field>
                                <label>Preço</label>
                                <input type='number' placeholder='Ex: 10,00' onChange={({ target }) => setFormData({ ...formData, price: Number(target.value.replace(',', '.')) * 100 })} />
                            </Form.Field>
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
                            setFormData({ category: '', name: '', price: 0 });
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </ProductContainer>
    );
}

export default Products;