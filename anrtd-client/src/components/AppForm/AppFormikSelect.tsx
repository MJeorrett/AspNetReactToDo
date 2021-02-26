import { MenuItem } from '@material-ui/core';
import AppFormikTextField, { AppFormikTextFieldProps } from './AppFormikTextField';

export type AppSelectOption = {
    value: number,
    label: string,
}

export interface AppSelectProps extends AppFormikTextFieldProps {
    options: AppSelectOption[],
    showPleaseSelect?: boolean,
    pleaseSelectText?: string,
}

const AppFormikSelect: React.FC<AppSelectProps> = ({
    options,
    showPleaseSelect,
    pleaseSelectText = '-- Please Select --',
    ...restOfProps
}) => {
    return (
        <AppFormikTextField
            {...restOfProps}
            select
        >
            {showPleaseSelect && (
                <MenuItem value={-1}>
                    {pleaseSelectText}
                </MenuItem>
            )}
            {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </AppFormikTextField>
    );
};

export default AppFormikSelect;