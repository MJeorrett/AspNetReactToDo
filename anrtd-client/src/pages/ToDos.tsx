import ToDosTable from '../components-todos/ToDosTable';
import AppPageHeading from '../components/AppPageHeading';

const ToDosPage: React.FC = () => {
    return (
        <>
            <AppPageHeading>ToDos</AppPageHeading>
            <ToDosTable />
        </>
    );
};

export default ToDosPage;