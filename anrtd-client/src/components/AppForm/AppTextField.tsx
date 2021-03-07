import { StandardTextFieldProps, TextField, useTheme } from '@material-ui/core';

export interface AppTextFieldProps extends StandardTextFieldProps {
    readonly?: boolean,
}

const AppTextField: React.FC<AppTextFieldProps> = ({
    fullWidth = true,
    readonly,
    InputLabelProps,
    InputProps,
    ...restOfProps
}) => {
    const theme = useTheme();

    return (
        <TextField
            {...restOfProps}
            fullWidth={fullWidth}
            variant="standard"
            InputLabelProps={{
                ...InputLabelProps,
                style: {
                    ...InputLabelProps?.style,
                    color: readonly ? theme.palette.text.secondary : undefined,
                },
            }}
            InputProps={{
                ...InputProps,
                disableUnderline: readonly || undefined,
                style: {
                    ...InputProps?.style,
                    color: readonly ? 'currentColor' : undefined,
                }
            }}
        />
    );
};

export default AppTextField;