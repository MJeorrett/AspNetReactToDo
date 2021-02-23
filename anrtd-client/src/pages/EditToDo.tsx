import { useCallback } from 'react';
import { getToDoById } from '../api/todos';
import { useHttpRequest } from '../api/utils/useHttpRequest';
import { useToDoId } from '../AppRoutes';
import ToDoForm from '../components-todos/Form';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import AppPageHeading from '../components/AppPageHeading';

const EditToDoPage: React.FC = () => {
    const toDoId = useToDoId();
    const fetchToDo = useCallback(() => getToDoById(toDoId), [toDoId]);
    const {
        isLoading,
        isError,
        result: toDo,
    } = useHttpRequest(fetchToDo);

    return (
        <>
            <AppPageHeading>Edit ToDo #{toDoId}</AppPageHeading>
            <ApiResponseWrapper
                isFetching={isLoading}
                isError={isError}
            >
                <ToDoForm
                    onSubmit={async values => console.log(values)}
                    initialValues={toDo}
                />
            </ApiResponseWrapper>
        </>
    );
};

export default EditToDoPage;