import { TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteToDo } from '../../api/todos';
import { appPaths } from '../../AppRoutes';
import { AppIconButton } from '../../components/AppIconButton';
import { ToDoSummary } from '../../models/ToDo';
import { actions } from '../../store';

export interface ToDosTableRowProps {
    toDo: ToDoSummary,
}

const ToDosTableRow: React.FC<ToDosTableRowProps> = ({
    toDo,
}) => {
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const response = await deleteToDo(toDo.id);
        setIsDeleting(false);

        if (response.isError) return;

        dispatch(actions.toDos.delete(toDo.id));
    };

    return (
        <TableRow>
            <TableCell>{toDo.id}</TableCell>
            <TableCell style={{ width: '100%' }}>{toDo.title}</TableCell>
            <TableCell>
                <AppIconButton
                    linkTo={appPaths.editToDo(toDo.id)}
                    onClick={undefined}
                    icon={<EditIcon />}
                />
            </TableCell>
            <TableCell>
                <AppIconButton
                    onClick={handleDelete}
                    icon={<DeleteIcon />}
                    showSpinner={isDeleting}
                />
            </TableCell>
        </TableRow>
    );
};

export default React.memo(ToDosTableRow, (prev, next) => prev.toDo.id === next.toDo.id);