import AppFormikDatePicker, { AppFormikDatePickerProps } from './AppFormikDatePicker';

export type CreatePreconfiguredAppFormikDatePickerOptions = {
    name: string,
    label: string,
}

export type PreconfiguredAppFormikDatePickerProps = Omit<AppFormikDatePickerProps, 'name'>

export const createPreconfiguredAppFormikDatePicker = ({
    name,
    label
}: CreatePreconfiguredAppFormikDatePickerOptions): React.FC<PreconfiguredAppFormikDatePickerProps> => {
    const PreConfiguredAppFormikDatePicker = (restOfProps: PreconfiguredAppFormikDatePickerProps) => (
        <AppFormikDatePicker label={label} {...restOfProps} name={name} />
    );

    return PreConfiguredAppFormikDatePicker;
};

export default createPreconfiguredAppFormikDatePicker;