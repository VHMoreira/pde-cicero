import React from 'react';
import { useTable } from 'react-table';
import { Table as STable } from 'semantic-ui-react'
import Order from '../../../../models/Order.model';
import { priceFormat } from '../../../../shared/utils/priceFormat';
import { tableDataFormater } from '../../../../shared/utils/tableDataFormater';

interface Props {
    sales: Order[];
}

const Table: React.FC<Props> = ({ sales }) => {
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
    } = useTable({ data: sales, columns: columns });

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
                        </STable.Row>
                    )
                })}
                <STable.Row>
                    <STable.Cell />
                    <STable.Cell />
                    <STable.Cell content='R$' textAlign='right' />
                    <STable.Cell>
                        {priceFormat(sales.reduce((acc, current) => acc + current.total, 0))}
                    </STable.Cell>
                </STable.Row>
            </STable.Body>
        </STable>
    );
}

export default Table;