import AppPageHeading from '../components/AppPageHeading';
import ToDoListsTable from '../todoLists/ToDoListsTable';

const ToDoListsPage: React.FC = () => {
    return (
        <>
            <AppPageHeading>ToDo Lists</AppPageHeading>
            <ToDoListsTable />
        </>
    );
};

export default ToDoListsPage;

