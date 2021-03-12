import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import AppTable from '../../components/AppTable';
import { actions, selectors, useDispatchEffect } from '../../store';
import ToDoListsTableRow from './ToDoListsTableRow';
import useNoToDoListsMessage from './useNoToDoListsMessage';

const ToDoListsTable: React.FC = () => {
    useDispatchEffect(actions.toDoLists.fetchAll);
    const dispatch = useDispatch();

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDoLists.apiState);

    const toDoLists = useSelector(selectors.toDoLists.all);
    const pagination = useSelector(selectors.toDoLists.pagination);
    const noToDoListsMessage = useNoToDoListsMessage();

    const handleChangePageNumber = (pageNumber: number) => {
        dispatch(actions.toDoLists.setPageNumber(pageNumber));
    };

    const handleChangePageSize = (pageSize: number) => {
        dispatch(actions.toDoLists.setPageSize(pageSize));
    };

    return (
        <>
            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                <AppTable
                    headers={['ID', 'Title' ]}
                    entities={toDoLists}
                    noEntitiesMessage={noToDoListsMessage}
                    pagination={pagination}
                    onChangePageNumber={handleChangePageNumber}
                    onChangePageSize={handleChangePageSize}
                    renderRow={toDoList => (
                        <ToDoListsTableRow
                            key={toDoList.id}
                            toDoList={toDoList}
                        />
                    )}
                />
            </ApiResponseWrapper>
        </>
    );
};

export default ToDoListsTable;