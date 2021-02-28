import { useTheme } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { useField, useFormikContext } from 'formik';
import AppFormikTextField from './AppFormikTextField';
import { FormikInputPropsKeys } from './common';


export interface AppFormikDatePickerProps extends
    Omit<KeyboardDatePickerProps,
    FormikInputPropsKeys |
    'helperText' |
    'error' |
    'variant' |
    'InputLabelProps' |
    'InputProps' |
    'style'> {
    name: string,
    readonly?: boolean,
}

const AppFormikDatePicker: React.FC<AppFormikDatePickerProps> = ({
    name,
    fullWidth = true,
    disabled,
    readonly,
    keyboardIcon,
    ...restOfProps
}) => {
    const theme = useTheme();
    const { isSubmitting } = useFormikContext();
    const [fieldProps, fieldMeta] = useField<ParsableDate>(name);
    const isError = fieldMeta.touched && !!fieldMeta.error;
    const helperText = fieldMeta.touched ? fieldMeta.error : undefined;

    return (
        <KeyboardDatePicker
            {...restOfProps}
            {...fieldProps}
            value={readonly && !fieldProps.value ? new Date() : fieldProps.value}
            format={fieldProps.value ? 'do MMMM yyyy hh:mmaaa' : '-'}
            helperText={helperText}
            error={isError}
            disabled={readonly || isSubmitting || disabled}
            fullWidth={fullWidth}
            InputLabelProps={{
                style: {
                    color: readonly ? theme.palette.text.secondary : undefined,
                },
            }}
            InputProps={{
                disableUnderline: readonly || undefined,
                style: {
                    color: readonly ? 'currentColor' : undefined,
                }
            }}
            style={{
                marginBottom: theme.spacing(2),
            }}
            keyboardIcon={keyboardIcon ? keyboardIcon : readonly ? false : undefined}
        />
    );
};

export default AppFormikDatePicker;