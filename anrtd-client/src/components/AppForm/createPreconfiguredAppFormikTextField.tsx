import AppFormikTextField, { AppFormikTextFieldProps } from './AppFormikTextField';

export type CreatePreconfiguredAppFormikTextFieldOptions = {
    name: string,
    label: string,
}

export type PreconfiguredAppFormikTextFieldProps = Omit<AppFormikTextFieldProps, 'name'>

export const createPreconfiguredAppFormikTextField = ({
    name,
    label
}: CreatePreconfiguredAppFormikTextFieldOptions): React.FC<PreconfiguredAppFormikTextFieldProps> => {
    const PreConfiguredAppFormikTextField = (restOfProps: PreconfiguredAppFormikTextFieldProps) => (
        <AppFormikTextField label={label} {...restOfProps} name={name} />
    );

    return PreConfiguredAppFormikTextField;
};

export default createPreconfiguredAppFormikTextField;