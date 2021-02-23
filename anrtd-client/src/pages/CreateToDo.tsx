import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { createToDo } from '../api/todos';
import { appPaths } from '../AppRoutes';
import CreateToDoForm, { CreateToDoFormValues } from '../components-todos/CreateForm';
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
            <Typography variant="h3" component="h1" gutterBottom>Create ToDo</Typography>

            <CreateToDoForm
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CreateToDoPage;