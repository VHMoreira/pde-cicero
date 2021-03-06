import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import Product from '../../../../models/Product.model';
import { Button, Table as STable } from 'semantic-ui-react'
import { useStoresActions } from '../../../../providers/store';
import { tableDataFormater } from '../../../../shared/utils/tableDataFormater';

interface Props {
    products: Product[];
    openEditModal(product: Product): void;
}

const Table: React.FC<Props> = ({ products, openEditModal }) => {
    const deleteProduct = useStoresActions(action => action.deleteProduct);
    const columns = useMemo(() => [
        {
            Header: 'Nome',
            accessor: 'name' as keyof Product, // accessor is the "key" in the data
        },
        {
            Header: 'Categoria',
            accessor: 'category' as keyof Product,
        },
        {
            Header: 'Preço/Unidade',
            accessor: 'price' as keyof Product,
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ data: products, columns: columns });

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
                                <Button basic icon='pencil' onClick={() => openEditModal(row.original)} />
                            </STable.Cell>
                            <STable.Cell textAlign='center'>
                                <Button basic color='red' icon='trash alternate outline' onClick={() => deleteProduct({ id: row.original._id })} />
                            </STable.Cell>
                        </STable.Row>
                    )
                })}
            </STable.Body>
        </STable>
    );
}

export default Table;