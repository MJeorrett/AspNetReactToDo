import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getToDoById, updateToDo } from '../api/todos';
import { useHttpRequest } from '../api/utils/useHttpRequest';
import { appPaths, useToDoId } from '../AppRoutes';
import ToDoForm, { ToDoFormValues } from '../components-todos/Form';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import AppPageHeading from '../components/AppPageHeading';

const EditToDoPage: React.FC = () => {
    const history = useHistory();
    const toDoId = useToDoId();
    const fetchToDo = useCallback(() => getToDoById(toDoId), [toDoId]);
    const {
        isLoading,
        isError,
        result: toDo,
    } = useHttpRequest(fetchToDo);

    const handleUpdateToDo = async (values: ToDoFormValues) => {
        const response = await updateToDo({
            id: toDoId,
            ...values
        });

        if (!response.isError) {
            history.push(appPaths.toDos);
        }
    };

    return (
        <>
            <AppPageHeading>Edit ToDo #{toDoId}</AppPageHeading>
            <ApiResponseWrapper
                isFetching={isLoading}
                isError={isError}
            >
                <ToDoForm
                    onSubmit={handleUpdateToDo}
                    initialValues={toDo}
                />
            </ApiResponseWrapper>
        </>
    );
};

export default EditToDoPage;