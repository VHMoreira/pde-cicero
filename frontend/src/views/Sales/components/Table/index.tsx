import React, { useCallback, useState } from 'react';
import { Accordion, Icon, Table as STable, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react'
import Order from '../../../../models/Order.model';
import { priceFormat } from '../../../../shared/utils/priceFormat';
import { tableDataFormater } from '../../../../shared/utils/tableDataFormater';
import { TableContainer, TableContent } from './styles';

interface Props {
    sales: Order[];
}

const Table: React.FC<Props> = ({ sales }) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = useCallback((index) => {
        const newIndex = activeIndex === index ? -1 : index;

        setActiveIndex(newIndex);
    }, [activeIndex]);


    return (
        <TableContainer>
            <TableContent>
                <Accordion fluid styled>
                    {sales.map((s, index) => (
                        <>
                            <Accordion.Title
                                active={activeIndex === index}
                                index={index}
                                onClick={() => handleClick(index)}>
                                <header>
                                    <Icon name='dropdown' />
                                    <div>
                                        {s.client_name}
                                    </div>
                                    <div>
                                        {(tableDataFormater(s.status))}
                                    </div>
                                    <div>
                                        {(tableDataFormater(s.created_at))}
                                    </div>
                                    <div>
                                        {(tableDataFormater(s.total))}
                                    </div>
                                </header>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === index}>
                                <STable striped celled>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell>
                                                Nome do produto
                                            </TableHeaderCell>
                                            <TableHeaderCell>
                                                Preço
                                            </TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {s.products.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>
                                                    R$ {priceFormat(product.price)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </STable>
                            </Accordion.Content>
                        </>
                    ))}
                </Accordion>

            </TableContent>
        </TableContainer>
    );
}

export default Table;