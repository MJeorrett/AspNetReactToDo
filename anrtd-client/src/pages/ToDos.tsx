import { Typography } from '@material-ui/core';
import ToDosTable from '../components-todos/ToDosTable';

const ToDosPage: React.FC = () => {
    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>ToDos</Typography>
            <ToDosTable />
        </>
    );
};

export default ToDosPage;