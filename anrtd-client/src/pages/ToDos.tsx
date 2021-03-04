import { useTheme } from '@material-ui/core';
import ToDoStatusFilter from '../components-todos/StatusFilter';
import ToDosTable from '../components-todos/ToDosTable';
import AppPageHeading from '../components/AppPageHeading';

const ToDosPage: React.FC = () => {
    const theme = useTheme();
    return (
        <>
            <AppPageHeading>ToDos</AppPageHeading>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: theme.spacing(1),
                }}>
                <ToDoStatusFilter />
            </div>
            <ToDosTable />
        </>
    );
};

export default ToDosPage;