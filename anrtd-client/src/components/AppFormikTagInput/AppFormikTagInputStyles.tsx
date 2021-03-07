import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
        },
    },
    input: {
        width: '140px',
        minWidth: '140px',
    }
}));
