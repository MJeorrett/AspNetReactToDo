import { Typography } from '@material-ui/core';

const HomePage: React.FC = () => {
    return (
        <>
            <Typography variant="h2" component="h1" gutterBottom>Welcome to Asp.Net React ToDos</Typography>
            <Typography variant="h5" gutterBottom>The an example project using the layout, packages and boilerplate I like to use for Asp.Net Core + React + EF Core projects.</Typography>
        </>
    );
}

export default HomePage;