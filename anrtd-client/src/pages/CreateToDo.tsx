import { useHistory } from 'react-router-dom';

import { createToDo } from '../api/todos';
import { appPaths } from '../AppRoutes';
import CreateToDoForm, { CreateToDoFormValues } from '../components-todos/CreateForm';
import AppPageHeading from '../components/AppPageHeading';
import { successToast } from '../toast';

const CreateToDoPage: React.FC = () => {
    const history = useHistory();

    const handleSubmit = async (toDo: CreateToDoFormValues) => {
        const response = await createToDo(toDo);

        if (!response.isError) {
            successToast('ToDo created.');
            history.push(appPaths.toDos);
        }

        return response;
    };

    return (
        <>
            <AppPageHeading>Create ToDo</AppPageHeading>

            <CreateToDoForm
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CreateToDoPage;