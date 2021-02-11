import React from 'react';
import { useTable } from 'react-table';
import { Button, Popup, Table as STable } from 'semantic-ui-react'
import { useStoresActions } from '../../../../providers/store';
import Order from '../../../../models/Order.model';
import { tableDataFormater } from '../../../../shared/utils/tableDataFormater';

interface Props {
    orders: Order[];
}

const Table: React.FC<Props> = ({ orders }) => {
    const changeStatus = useStoresActions(action => action.changeStatus);
    const columns = React.useMemo(() => [
        {
            Header: 'Nome do cliente',
            accessor: 'client_name' as keyof Order, // accessor is the "key" in the data
        },
        {
            Header: 'Status',
            accessor: 'status' as keyof Order,
        },
        {
            Header: 'Feito em',
            accessor: 'created_at' as keyof Order,
        },
        {
            Header: 'Valor total',
            accessor: 'total' as keyof Order,
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ data: orders, columns: columns });

    return (
        <STable striped {...getTableProps()}>
            <STable.Header>
                {headerGroups.map(headerGroup => (
                    <STable.Row {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <STable.HeaderCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </STable.HeaderCell>
                        ))}
                        <STable.HeaderCell />
                        <STable.HeaderCell />
                    </STable.Row>
                ))}
            </STable.Header>
            <STable.Body {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <STable.Row {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <STable.Cell {...cell.getCellProps()}>
                                        {tableDataFormater(cell.value)}
                                    </STable.Cell>
                                )
                            })}
                            <STable.Cell textAlign='center'>
                                {row.original.status === 'on_progress' &&
                                    <Popup
                                        trigger={<Button
                                            basic
                                            color='green'
                                            icon='check circle outline'
                                            onClick={() => changeStatus({ id: row.original._id, status: 'confirmed' })}
                                        />}
                                        content='Confirmar pedido'
                                        position='top center'
                                    />}
                            </STable.Cell>
                            <STable.Cell textAlign='center'>
                                {row.original.status === 'on_progress' &&
                                    <Popup
                                        trigger={<Button
                                            basic
                                            color='red'
                                            icon='ban'
                                            onClick={() => changeStatus({ id: row.original._id, status: 'canceled' })}
                                        />}
                                        content='Cancelar pedido'
                                        position='top center'
                                    />}
                            </STable.Cell>
                        </STable.Row>
                    )
                })}
            </STable.Body>
        </STable>
    );
}

export default Table;