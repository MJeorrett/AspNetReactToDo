import useStyles from './AppFormStyles';

const AppForm: React.FC = ({
    children,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};
 
export default AppForm;