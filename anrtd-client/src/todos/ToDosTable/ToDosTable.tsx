import { useDispatch, useSelector } from 'react-redux';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import AppTable from '../../components/AppTable';
import { actions, selectors, useDispatchEffect } from '../../store';
import useNoToDosMessage from './useNoToDosMessage';
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
    const noToDosMessage = useNoToDosMessage();

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
                <AppTable
                    headers={['ID', 'Title', '', '', '']}
                    entities={toDos}
                    noEntitiesMessage={noToDosMessage}
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
            </ApiResponseWrapper>
        </>
    );
};

export default ToDosTable;