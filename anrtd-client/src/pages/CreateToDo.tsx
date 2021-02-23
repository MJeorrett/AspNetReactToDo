import { useHistory } from 'react-router-dom';

import { createToDo } from '../api/todos';
import { appPaths } from '../AppRoutes';
import ToDoForm, { ToDoFormValues } from '../components-todos/Form';
import AppPageHeading from '../components/AppPageHeading';

const CreateToDoPage: React.FC = () => {
    const history = useHistory();

    const handleSubmit = async (toDo: ToDoFormValues) => {
        const response = await createToDo(toDo);

        if (!response.isError) {
            history.push(appPaths.toDos);
        }

        return response;
    };

    return (
        <>
            <AppPageHeading>Create ToDo</AppPageHeading>

            <ToDoForm
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CreateToDoPage;