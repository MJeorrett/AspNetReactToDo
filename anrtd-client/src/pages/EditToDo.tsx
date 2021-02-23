import { useToDoId } from '../AppRoutes';
import AppPageHeading from '../components/AppPageHeading';

const EditToDoPage: React.FC = () => {
    const toDoId = useToDoId();

    return (
        <AppPageHeading>Edit ToDo #{toDoId}</AppPageHeading>
    );
};
 
export default EditToDoPage;