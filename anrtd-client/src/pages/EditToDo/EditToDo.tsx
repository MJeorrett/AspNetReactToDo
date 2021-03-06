import React, { useCallback } from 'react';
import * as api from '../../api';
import { appPaths, useToDoId } from '../../AppRoutes';
import ToDoForm, { ToDoFormComponent, ToDoFormValues } from '../../components-todos/Form';
import ApiResponseWrapper from '../../components/ApiResponseWrapper';
import AppPageHeading from '../../components/AppPageHeading';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppButton, { AppButtons } from '../../components/AppButton';
import TShirtIcon from '../../components/TShirtIcon';
import useStyles from './EditToDoStyles';

const EditToDoPage: React.FC = () => {
    const toDoId = useToDoId();
    const classes = useStyles();
    const fetchToDo = useCallback(() => api.getToDoById(toDoId), [toDoId]);
    const {
        isLoading,
        isError,
        result: toDo,
        forceRefresh: reloadToDo,
    } = api.useHttpRequest(fetchToDo);

    const handleUpdateToDo = async (values: ToDoFormValues) => {
        const response = await api.updateToDo({
            id: toDoId,
            ...values
        });

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
                <ToDoForm
                    onSubmit={handleUpdateToDo}
                    initialValues={toDo}
                >
                    {formikProps => (
                        <>
                            <div className={classes.heading}>
                                {(formikProps.values.tShirtSize || formikProps.values.tShirtSize === 0) && (
                                    <TShirtIcon size={formikProps.values.tShirtSize} />
                                )}
                                <AppPageHeading gutterBottom={false}>Edit ToDo #{toDoId}</AppPageHeading>
                            </div>
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