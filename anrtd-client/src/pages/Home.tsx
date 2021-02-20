import { Typography } from '@material-ui/core';
import { FormikProps } from 'formik';
import { createRef } from 'react';
import { useSelector } from 'react-redux';
import { createToDo } from '../api/todos';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import { actions, selectors, useDispatchEffect } from '../store';
import { successToast } from '../toast';
import CreateToDoForm from '../toDos/CreateToDoForm';
import { CreateToDoFormValues } from '../toDos/CreateToDoForm/CreateToDoForm';

export interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
    const fetchAllToDos = useDispatchEffect(actions.toDos.fetchAll);

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDos.apiState)

    const toDos = useSelector(selectors.toDos.all);
    const formRef = createRef<FormikProps<CreateToDoFormValues>>();

    const handleSubmit = async (toDo: CreateToDoFormValues) => {
        const response = await createToDo(toDo);

        if (!response.isError) {
            formRef.current?.resetForm();
            fetchAllToDos();
            successToast("ToDo created.");
        }

        return response;
    }

    return (
        <>
            <Typography variant="h2" component="h1" gutterBottom>Welcome to Asp.Net React ToDos</Typography>
            <Typography variant="h5" gutterBottom>The an example project using the layout, packages and boilerplate I like to use for Asp.Net Core + React + EF Core projects.</Typography>

            <Typography variant="h3">Create ToDo</Typography>
            <CreateToDoForm
                formikRef={formRef}
                onSubmit={handleSubmit}
            />

            <Typography variant="h3">All ToDos</Typography>
            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                <pre>{JSON.stringify(toDos, null, 2)}</pre>
            </ApiResponseWrapper>
        </>
    );
}

export default HomePage;