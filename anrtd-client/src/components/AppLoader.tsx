import { CircularProgress, styled } from '@material-ui/core';

const AppLoader = styled(CircularProgress)(({ theme }) => ({
    display: 'block',
    marginTop: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto',
}));

export default AppLoader;