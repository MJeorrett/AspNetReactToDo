import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import AppTable from '../../components/AppTable';
import { actions, selectors, useDispatchEffect } from '../../store';
import ToDosTableRow from './ToDosTableRow';

const ToDosTable: React.FC = () => {
    useDispatchEffect(actions.toDos.fetchAll);
    const dispatch = useDispatch();

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDos.apiState);

    const toDos = useSelector(selectors.toDos.all);
    const pagination = useSelector(selectors.toDos.pagination);

    const handleChangePageNumber = (pageNumber: number) => {
        dispatch(actions.toDos.setPageNumber(pageNumber));
    };

    const handleChangePageSize = (pageSize: number) => {
        dispatch(actions.toDos.setPageSize(pageSize));
    };

    return (
        <>
            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                {toDos.length === 0 ? <Typography>You don&lsquo;t have any ToDos yet.</Typography> :
                    <AppTable
                        headers={['ID', 'Title', '', '']}
                        entities={toDos}
                        pagination={pagination}
                        onChangePageNumber={handleChangePageNumber}
                        onChangePageSize={handleChangePageSize}
                        renderRow={toDo => (
                            <ToDosTableRow
                                key={toDo.id}
                                toDo={toDo}
                            />
                        )}
                    />
                }
            </ApiResponseWrapper>
        </>
    );
};

export default ToDosTable;