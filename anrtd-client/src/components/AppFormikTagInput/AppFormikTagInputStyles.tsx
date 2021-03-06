import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(2),
        '& > *': {
            margin: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
        },
    },
    input: {
        width: '140px',
        minWidth: '140px',
    }
}));
