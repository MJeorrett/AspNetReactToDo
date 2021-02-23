import { TextField, TextFieldProps, useTheme } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

type InternallySetTextFieldProps = Omit<TextFieldProps, 'helperText'|'error'|'name'>

export interface AppFormikTextFieldProps extends InternallySetTextFieldProps {
    name: string,
}

const AppFormikTextField: React.FC<AppFormikTextFieldProps> = ({
    name,
    fullWidth = true,
    disabled,
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
            disabled={isSubmitting || disabled}
            fullWidth={fullWidth}
            style={{
                marginBottom: theme.spacing(2),
            }}
        />
    );
};
 
export default AppFormikTextField;