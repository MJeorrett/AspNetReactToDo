import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { Pagination } from '../models/Pagination';

export interface AppTableProps<TRow> {
    headers: string[],
    entities: TRow[],
    renderRow: (entity: TRow) => JSX.Element,
    pagination?: Pagination,
    pageSizeOptions?: number[],
    onChangePageNumber?: (pageNumber: number) => void,
    onChangePageSize?: (pageSize: number) => void,
    noEntitiesMessage: string,
}

const AppTable = <TRow,>({
    headers,
    entities,
    renderRow,
    pagination,
    pageSizeOptions = [10, 25, 100],
    onChangePageNumber,
    onChangePageSize,
    noEntitiesMessage,
}: AppTableProps<TRow>): JSX.Element => {
    if (pagination) {
        if (!onChangePageNumber || !onChangePageSize) {
            console.warn('AppTable: For pagination to work you must provide page number and size change handlers.');
        }
    }

    const handleChangePageNumber = (_: unknown, pageNumber: number) => {
        onChangePageNumber && onChangePageNumber(pageNumber + 1);
    };

    const handleChangePageSize = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const pageSize = parseInt(event.target.value);
        onChangePageSize && onChangePageSize(pageSize);
    };

    if (entities.length === 0) {
        return (
            <Typography>{noEntitiesMessage}</Typography>
        );
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map(renderRow)}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <TablePagination
                    component="div"
                    rowsPerPageOptions={pageSizeOptions}
                    count={pagination.totalCount}
                    rowsPerPage={pagination.pageSize}
                    page={pagination.pageNumber - 1}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePageNumber}
                    onChangeRowsPerPage={handleChangePageSize}
                />
            )}
        </>
    );
};

export default AppTable;