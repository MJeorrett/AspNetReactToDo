import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

export interface AppTableProps<TRow> {
    headers: string[],
    entities: TRow[],
    renderRow: (entity: TRow) => JSX.Element,
}

const AppTable = <TRow,>({
    headers,
    entities,
    renderRow,
}: AppTableProps<TRow>) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map(header => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entities.map(renderRow)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppTable;