import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import AppTable from '../components/AppTable';
import { actions, selectors, useDispatchEffect } from '../store';

export interface ToDosTableProps {

}

const ToDosTable: React.FC<ToDosTableProps> = () => {
    useDispatchEffect(actions.toDos.fetchAll);

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDos.apiState)

    const toDos = useSelector(selectors.toDos.all);

    return (
        <>
            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                <AppTable
                    headers={['Id', 'Title']}
                    entities={toDos}
                    renderRow={toDo => (
                        <TableRow key={toDo.id}>
                            <TableCell>{toDo.id}</TableCell>
                            <TableCell>{toDo.title}</TableCell>
                        </TableRow>
                    )}
                />
            </ApiResponseWrapper>
        </>
    );
}

export default ToDosTable;