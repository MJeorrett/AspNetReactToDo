import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getToDoById, updateToDo } from '../api/todos';
import { useHttpRequest } from '../api';
import { appPaths, useToDoId } from '../AppRoutes';
import ToDoForm, { ToDoFormComponent, ToDoFormValues } from '../components-todos/Form';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import AppPageHeading from '../components/AppPageHeading';
import AppFormikSubmitButton from '../components/AppForm/AppFormikSubmitButton';
import AppButton, { AppButtons } from '../components/AppButton';

const EditToDoPage: React.FC = () => {
    const history = useHistory();
    const toDoId = useToDoId();
    const fetchToDo = useCallback(() => getToDoById(toDoId), [toDoId]);
    const {
        isLoading,
        isError,
        result: toDo,
        forceRefresh: reloadToDo,
    } = useHttpRequest(fetchToDo);

    const handleUpdateToDo = async (values: ToDoFormValues) => {
        const response = await updateToDo({
            id: toDoId,
            ...values
        });

        if (!response.isError) {
            reloadToDo();
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
                >
                    {formikProps => (
                        <>
                            <ToDoFormComponent
                                {...formikProps}
                            />
                            <AppButtons>
                                <AppButton linkPath={appPaths.toDos}>Back</AppButton>
                                <AppFormikSubmitButton>Save</AppFormikSubmitButton>
                            </AppButtons>
                        </>
                    )}
                </ToDoForm>
            </ApiResponseWrapper>
        </>
    );
};

export default EditToDoPage;