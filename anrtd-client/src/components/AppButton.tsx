import { Button, ButtonProps, CircularProgress, makeStyles } from '@material-ui/core';

export interface AppButtonProps extends ButtonProps {
    showSpinner?: boolean,
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

export const AppButton: React.FC<AppButtonProps> = ({
    disabled,
    showSpinner,
    variant = 'contained',
    ...restOfProps
}) => {
    const classes = useStyles();
    return (
        <span className={classes.root}>
            <Button
                {...restOfProps}
                disabled={disabled || showSpinner}
                color="primary"
                variant={variant}
            />
            {showSpinner && (
                <CircularProgress size={24} className={classes.progress} />
            )}
        </span>
    );
}
