import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
    heading: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginBottom: theme.spacing(4),
        '& > *:first-child': {
            marginRight: theme.spacing(3),
        }
    }
}));