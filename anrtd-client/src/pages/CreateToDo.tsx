import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createToDo } from '../api/todos';
import { appPaths } from '../AppRoutes';
import { successToast } from '../toast';
import CreateToDoForm from '../toDos/CreateForm';
import { CreateToDoFormValues } from '../toDos/CreateForm/CreateToDoForm';

const CreateToDoPage: React.FC = () => {
    const history = useHistory();

    const handleSubmit = async (toDo: CreateToDoFormValues) => {
        const response = await createToDo(toDo);

        if (!response.isError) {
            successToast("ToDo created.");
            history.push(appPaths.toDos);
        }

        return response;
    }

    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>Create ToDo</Typography>

            <CreateToDoForm
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default CreateToDoPage;