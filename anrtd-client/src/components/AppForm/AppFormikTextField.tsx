import {  useTheme } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

import AppTextField, { AppTextFieldProps } from './AppTextField';
import { FormikInputPropsKeys } from './common';

export interface AppFormikTextFieldProps extends
    Omit<AppTextFieldProps,
    FormikInputPropsKeys |
    'helperText' |
    'error'> {
    name: string,
    readonly?: boolean,
}

const AppFormikTextField: React.FC<AppFormikTextFieldProps> = ({
    name,
    disabled,
    readonly,
    ...restOfProps
}) => {
    const { isSubmitting } = useFormikContext();
    const [fieldProps, fieldMeta] = useField(name);
    const isError = fieldMeta.touched && !!fieldMeta.error;
    const helperText = fieldMeta.touched ? fieldMeta.error : undefined;

    return (
        <AppTextField
            {...restOfProps}
            {...fieldProps}
            value={readonly ? (fieldProps.value || '-') : fieldProps.value}
            readonly={readonly}
            helperText={helperText}
            error={isError}
            disabled={readonly || isSubmitting || disabled}
        />
    );
};

export default AppFormikTextField;