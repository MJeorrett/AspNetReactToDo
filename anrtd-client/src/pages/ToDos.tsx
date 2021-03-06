import { useTheme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ToDoStatusFilter from '../components-todos/StatusFilter';
import ToDosTable from '../components-todos/ToDosTable';
import AppPageHeading from '../components/AppPageHeading';
import { selectors } from '../store';

const ToDosPage: React.FC = () => {
    const theme = useTheme();
    const { isFetching, isError } = useSelector(selectors.toDos.apiState);
    const showStatusFilter = !isFetching && !isError;

    return (
        <>
            <AppPageHeading>ToDos</AppPageHeading>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: theme.spacing(1),
                }}>
                {showStatusFilter && <ToDoStatusFilter />}
            </div>
            <ToDosTable />
        </>
    );
};

export default ToDosPage;