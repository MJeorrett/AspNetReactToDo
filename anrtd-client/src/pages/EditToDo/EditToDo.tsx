import React, { useCallback } from 'react';
import * as api from '../../api';
import { appPaths, useToDoId } from '../../AppRoutes';
import { ToDoFormValues } from '../../components-todos/Form';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import { mapToApiUpdateToDo } from '../../modelMappings/ToDo';
import EditToDoPageComp from './EditToDoComp';

const EditToDoPage: React.FC = () => {
    const toDoId = useToDoId();
    const fetchToDo = useCallback(() => api.getToDoById(toDoId), [toDoId]);
    const {
        isLoading,
        isError,
        result: toDo,
        forceRefresh: reloadToDo,
    } = api.useHttpRequest(fetchToDo);

    const handleUpdateToDo = async (values: ToDoFormValues) => {
        const response = await api.updateToDo(mapToApiUpdateToDo(toDoId, values));

        if (!response.isError) {
            reloadToDo();
        }
    };

    return (
        <>
            <ApiResponseWrapper
                isFetching={isLoading}
                isError={isError}
            >
                {toDo && (
                    <EditToDoPageComp
                        toDo={toDo}
                        handleUpdateToDo={handleUpdateToDo}
                        backLinkPath={appPaths.toDos}
                    />
                )}
            </ApiResponseWrapper>
        </>
    );
};

export default EditToDoPage;