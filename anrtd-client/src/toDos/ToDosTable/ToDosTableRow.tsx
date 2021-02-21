import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { AppIconButton } from '../../components/AppIconButton';
import { ToDoSummary } from '../../models/ToDo';

export interface ToDosTableRowProps {
    toDo: ToDoSummary,
    onDelete: () => void,
    isDeleting: boolean,
}

const ToDosTableRow: React.FC<ToDosTableRowProps> = ({
    toDo,
    onDelete,
    isDeleting,
}) => {
    return (
        <TableRow key={toDo.id}>
            <TableCell>{toDo.id}</TableCell>
            <TableCell>{toDo.title}</TableCell>
            <TableCell>
                <AppIconButton
                    onClick={onDelete}
                    iconName="delete"
                    showSpinner={isDeleting}
                />
            </TableCell>
        </TableRow>
    );
}

export default ToDosTableRow;