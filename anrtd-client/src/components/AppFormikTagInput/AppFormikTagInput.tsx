import { FieldArray, FieldArrayRenderProps, useField } from 'formik';
import { KeyboardEventHandler, useState } from 'react';
import { warningToast } from '../../toast';
import AppFormikTagInputComp from './AppFormikTagInputComp';

export interface AppFormikTagInputProps {
    name: string,
}

const AppFormikTagInput: React.FC<AppFormikTagInputProps> = ({
    name,
}) => {
    const [{ value: tags }] = useField<string[]>(name);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleAddTag = (newTag: string, arrayHelpers: FieldArrayRenderProps) => {
        if (!tags.includes(newTag)) {
            arrayHelpers.unshift(newTag);
            setInputValue('');
        } else {
            warningToast(`Tag '${newTag}' already exists.`);
        }
    };

    const createHandleKeyUp = (arrayHelpers: FieldArrayRenderProps): KeyboardEventHandler<HTMLDivElement> =>
        event => {
            if (event.key === 'Enter') {
                event.stopPropagation();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const newTag = (event.target as any).value;
                handleAddTag(newTag, arrayHelpers);
            }
        };

    const createHandleRemoveTag = (arrayHelpers: FieldArrayRenderProps) => arrayHelpers.remove;

    return (
        <FieldArray name={name}>
            {arrayHelpers => {
                return (
                    <AppFormikTagInputComp
                        inputValue={inputValue}
                        tags={tags}
                        onChange={event => setInputValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        onKeyUp={createHandleKeyUp(arrayHelpers)}
                        onRemoveTag={createHandleRemoveTag(arrayHelpers)}
                    />
                );
            }}
        </FieldArray>
    );
};

export default AppFormikTagInput;