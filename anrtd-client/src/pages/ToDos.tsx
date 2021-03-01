import ToDoStatusFilter from '../components-todos/StatusFilter';
import ToDosTable from '../components-todos/ToDosTable';
import AppPageHeading from '../components/AppPageHeading';

const ToDosPage: React.FC = () => {
    return (
        <>
            <AppPageHeading>ToDos</AppPageHeading>
            <div>
                <ToDoStatusFilter />
            </div>
            <ToDosTable />
        </>
    );
};

export default ToDosPage;