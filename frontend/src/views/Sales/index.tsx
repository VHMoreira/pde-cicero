import React, { useEffect } from 'react';
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