import { Button, ButtonProps, CircularProgress, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface AppButtonProps extends ButtonProps {
    showSpinner?: boolean,
    linkPath?: string,
}

const useStyles = makeStyles({
    root: {
        position: 'relative',
        whiteSpace: 'nowrap',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    }
});

const AppButton: React.FC<AppButtonProps> = ({
    disabled,
    showSpinner,
    variant = 'contained',
    linkPath,
    ...restOfProps
}) => {
    const classes = useStyles();

    return (
        <span className={classes.root}>
            <Button
                {...restOfProps as never}
                component={linkPath ? Link : undefined}
                to={linkPath}
                disabled={disabled || showSpinner}
                color="primary"
                variant={variant}
            />
            {showSpinner && (
                <CircularProgress size={24} className={classes.progress} />
            )}
        </span>
    );
};

export default AppButton;