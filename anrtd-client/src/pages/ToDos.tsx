import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ApiResponseWrapper from '../components/ApiResponseWrapper';
import { actions, selectors, useDispatchEffect } from '../store';

const ToDosPage: React.FC = () => {
    useDispatchEffect(actions.toDos.fetchAll);

    const {
        isFetching,
        isError,
    } = useSelector(selectors.toDos.apiState)

    const toDos = useSelector(selectors.toDos.all);

    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>ToDos</Typography>

            <ApiResponseWrapper
                isFetching={isFetching}
                isError={isError}
            >
                <pre>{JSON.stringify(toDos, null, 2)}</pre>
            </ApiResponseWrapper>
        </>
    );
}

export default ToDosPage;