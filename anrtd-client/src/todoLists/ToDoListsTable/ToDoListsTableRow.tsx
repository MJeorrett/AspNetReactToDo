import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { ToDoListSummary } from '../../models/ToDoList';

export interface ToDoListsTableRowProps {
    toDoList: ToDoListSummary,
}

const ToDoListsTableRow: React.FC<ToDoListsTableRowProps> = ({
    toDoList: toDo,
}) => {
    return (
        <TableRow>
            <TableCell>{toDo.id}</TableCell>
            <TableCell style={{ width: '100%' }}>{toDo.title}</TableCell>
        </TableRow>
    );
};

export default React.memo(ToDoListsTableRow, (prev, next) => prev.toDoList.id === next.toDoList.id);