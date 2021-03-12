import { useHistory } from 'react-router-dom';

import { createToDo } from '../api/todos';
import { appPaths } from '../AppRoutes';
import ToDoForm, { ToDoFormComp, ToDoFormValues } from '../todos/Form';
import AppButton, { AppButtons } from '../components/AppButton';
import AppForm from '../components/AppForm';
import AppFormikSubmitButton from '../components/AppForm/AppFormikSubmitButton';
import AppPageHeading from '../components/AppPageHeading';

const CreateToDoPage: React.FC = () => {
    const history = useHistory();

    const handleSubmit = async (toDo: ToDoFormValues) => {
        const response = await createToDo(toDo);

        if (!response.isError) {
            history.push(appPaths.editToDo(response.content));
        }

        return response;
    };

    return (
        <>
            <AppPageHeading>Create ToDo</AppPageHeading>

            <ToDoForm
                onSubmit={handleSubmit}
            >
                {formikProps => (
                    <AppForm>
                        <ToDoFormComp
                            {...formikProps}
                            createMode
                            autoFocus
                        />
                        <AppButtons>
                            <AppButton linkPath={appPaths.toDos}>Cancel</AppButton>
                            <AppFormikSubmitButton>Save</AppFormikSubmitButton>
                        </AppButtons>
                    </AppForm>
                )}
            </ToDoForm>
        </>
    );
};

export default CreateToDoPage;