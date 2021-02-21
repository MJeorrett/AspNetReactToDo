import { IconButton, TableCell, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import AppTable from '../../components/AppTable';
import { actions, selectors, useDispatchEffect } from '../../store';

export interface ToDosTableProps {

}

const ToDosTable: React.FC<ToDosTableProps> = () => {
    useDispatchEffect(actions.toDos.fetchAll);
    const dispatch = useDispatch();

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDos.apiState);

    const toDos = useSelector(selectors.toDos.all);
    const isDeletingById = useSelector(selectors.toDos.isDeletingById);

    const makeHandleDelete = (toDoId: number) => () => dispatch(actions.toDos.delete(toDoId));

    return (
        <>
            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                {toDos.length === 0 ? <Typography>You don't have any ToDos yet.</Typography> :
                    <AppTable
                        headers={['Id', 'Title', '']}
                        entities={toDos}
                        renderRow={toDo => (
                            <TableRow key={toDo.id}>
                                <TableCell>{toDo.id}</TableCell>
                                <TableCell>{toDo.title}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={makeHandleDelete(toDo.id)}
                                        color="primary"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    />
                }
            </ApiResponseWrapper>
        </>
    );
}

export default ToDosTable;