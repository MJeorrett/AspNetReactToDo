import { TextField, TextFieldProps, useTheme } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

type InternallySetTextFieldProps = Omit<TextFieldProps, 'helperText'|'error'|'name'>

export interface AppFormikTextFieldProps extends InternallySetTextFieldProps {
    name: string,
    readonly?: boolean,
}

const AppFormikTextField: React.FC<AppFormikTextFieldProps> = ({
    name,
    fullWidth = true,
    disabled,
    readonly,
    ...restOfProps
}) => {
    const theme = useTheme();
    const { isSubmitting } = useFormikContext();
    const [fieldProps, fieldMeta] = useField(name);
    const isError = fieldMeta.touched && !!fieldMeta.error;
    const helperText = fieldMeta.touched ? fieldMeta.error : undefined;

    return (
        <TextField
            {...restOfProps}
            {...fieldProps}
            helperText={helperText}
            error={isError}
            disabled={readonly || isSubmitting || disabled}
            fullWidth={fullWidth}
            variant="standard"
            InputLabelProps={{
                style: {
                    color: readonly ? theme.palette.text.secondary : undefined,
                },
            }}
            InputProps={{
                disableUnderline: readonly || undefined,
                style: {
                    color: readonly ? 'currentColor' :   undefined,
                }
            }}
            style={{
                marginBottom: theme.spacing(2),
            }}
        />
    );
};
 
export default AppFormikTextField;