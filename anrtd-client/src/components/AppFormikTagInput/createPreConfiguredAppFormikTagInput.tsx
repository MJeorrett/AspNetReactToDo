import AppFormikTagInput, { AppFormikTagInputProps } from './AppFormikTagInput';

export type CreatePreconfiguredAppFormikTagInputptions = {
    name: string,
}

export type PreconfiguredAppFormikTagInputProps = Omit<AppFormikTagInputProps, 'name'>

export const createPreconfiguredAppFormikTagInput = ({
    name,
}: CreatePreconfiguredAppFormikTagInputptions): React.FC<PreconfiguredAppFormikTagInputProps> => {
    const PreConfiguredAppFormikTagInput = (restOfProps: PreconfiguredAppFormikTagInputProps) => (
        <AppFormikTagInput {...restOfProps} name={name} />
    );

    return PreConfiguredAppFormikTagInput;
};

export default createPreconfiguredAppFormikTagInput;