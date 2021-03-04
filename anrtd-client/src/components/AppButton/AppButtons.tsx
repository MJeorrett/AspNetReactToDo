import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *:not(:last-child)': {
            marginRight: theme.spacing(2),
        },
    },
}));

const AppButtons: React.FC = ({
    children,
}) => {
    const classNames = useStyles();

    return (
        <div className={classNames.root}>
            {children}
        </div>
    );
};
 
export default AppButtons;