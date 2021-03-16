import { useCallback } from 'react';
import * as api from '../../api';
import { appPaths, useToDoId } from '../../AppRoutes';
import { ToDoFormValues } from '../../todos/Form';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import { mapToApiUpdateToDo } from '../../modelMappings/ToDo';
import ToDoForm from '../../todos/Form';
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
                    <ToDoForm
                        onSubmit={handleUpdateToDo}
                        initialValues={toDo}
                    >
                        <EditToDoPageComp
                            toDo={toDo}
                            backLinkPath={appPaths.toDos}
                        />
                    </ToDoForm>
                )}
            </ApiResponseWrapper>
        </>
    );
};

export default EditToDoPage;