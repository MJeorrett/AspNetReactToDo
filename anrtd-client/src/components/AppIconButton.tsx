import { CircularProgress, IconButton, IconButtonProps, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export type AppIconButtonIconNames = 'delete'|'edit';

export interface AppButtonProps extends Omit<IconButtonProps, 'children'> {
    showSpinner?: boolean,
    iconName: AppIconButtonIconNames,
}

const icons: {
    [key in AppIconButtonIconNames]: JSX.Element
} = {
    'delete': <DeleteIcon />,
    'edit': <EditIcon />,
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
    iconName,
    color = 'primary',
    ...restOfProps
}) => {
    const classes = useStyles();
    return (
        <span className={classes.root}>
            <IconButton
                {...restOfProps}
                disabled={disabled || showSpinner}
                color={color}
                children={icons[iconName]}
            />
            {showSpinner && (
                <CircularProgress size={24} className={classes.progress} />
            )}
        </span>
    );
}
