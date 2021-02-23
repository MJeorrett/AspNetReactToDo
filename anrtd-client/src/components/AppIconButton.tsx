import { CircularProgress, IconButton, IconButtonProps, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface AppButtonProps extends Omit<IconButtonProps, 'children'> {
    showSpinner?: boolean,
    icon: React.ReactNode,
    linkTo?: string,
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

export const AppIconButton: React.FC<AppButtonProps> = ({
    disabled,
    showSpinner,
    color = 'primary',
    icon,
    linkTo,
    ...restOfProps
}) => {
    const classes = useStyles();

    const iconButton = (
        <IconButton
            {...restOfProps}
            disabled={disabled || showSpinner}
            color={color}
        >
            {icon}
        </IconButton>
    );

    return (
        <span className={classes.root}>
            {linkTo ?
                <Link to={linkTo}>{iconButton}</Link> :
                iconButton
            }
            {showSpinner && (
                <CircularProgress size={24} className={classes.progress} />
            )}
        </span>
    );
};
