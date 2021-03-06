import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
    root: {
        maxWidth: '500px',
        marginRight: 'auto',
        marginLeft: 'auto',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2),
        }
    }
}));
