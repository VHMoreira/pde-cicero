import React, { useEffect, useState } from 'react';
import { useStoresActions } from '../../../../providers/store';
import { Button, Form, Modal } from 'semantic-ui-react';
import Product from '../../../../models/Product.model';

interface Props {
    open: boolean;
    product?: Product
    setOpen(open: boolean): void;
}

const Model: React.FC<Props> = ({ setOpen, open, product }) => {
    const create = useStoresActions(action => action.createProduct);
    const edit = useStoresActions(action => action.editProduct);

    const [formData, setFormData] = useState(() => {
        if (product) {
            return {
                name: product.name,
                category: product.category,
                price: product.price / 100
            }
        } else {
            return {
                name: '',
                category: '',
                price: 0
            }
        }
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                price: product.price / 100
            })
        } else {
            setFormData({
                name: '',
                category: '',
                price: 0
            })
        }
    }, [product])

    return (
        <Modal open={open}>
            <Modal.Header>Cadastrar produto</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Nome do produto</label>
                            <input placeholder='Ex: Arroz com frango' value={formData.name} onChange={({ target }) => setFormData({ ...formData, name: target.value })} />
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
                            <input value={formData.price} type='number' placeholder='Ex: 10,00' onChange={({ target }) => setFormData({ ...formData, price: Number(target.value.replace(',', '.')) })} />
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
                        if (product) {
                            edit({ ...formData, _id: product._id, price: formData.price * 100 });
                        } else {
                            create({ ...formData, price: formData.price * 100 });
                        }
                        setFormData({ category: '', name: '', price: 0 });
                        setOpen(false);
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default Model;