import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(2),
        '& > *:not(:last-child)': {
            marginRight: theme.spacing(1),
        },
    },
    input: {
        width: '140px',
        minWidth: '140px',
    }
}));
