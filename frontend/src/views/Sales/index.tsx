import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, TableCell, TableRow, Table as STable, TableBody } from 'semantic-ui-react';
import Product from '../../models/Product.model';
import { useStoresActions, useStoresState } from '../../providers/store';
import Table from './components/Table';
import { SalesContainer } from './styles';

const Sales: React.FC = () => {
    const load = useStoresActions((action) => action.loadSales);
    const sales = useStoresState(state => state.sales);


    useEffect(() => {
        load();
    }, [load]);

    return (
        <SalesContainer>
            <h2>Vendas confirmadas</h2>
            <Table sales={sales} />
        </SalesContainer>
    );
}

export default Sales;