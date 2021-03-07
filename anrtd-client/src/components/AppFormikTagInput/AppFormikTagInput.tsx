import { FieldArray, FieldArrayRenderProps, useField } from 'formik';
import * as Yup from 'yup';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import AppFormikTagInputComp from './AppFormikTagInputComp';

export interface AppFormikTagInputProps {
    name: string,
}

const AppFormikTagInput: React.FC<AppFormikTagInputProps> = ({
    name,
}) => {
    const [{ value: tags }] = useField<string[]>(name);
    const [inputValue, setInputValue] = useState('');
    const [inputValidationMessage, setInputValidationMessage] = useState<string | undefined>(undefined);
    const [isInputClicked, setIsInputClicked] = useState(false);


    const tagInputValidation = Yup.string()
        .matches(/^[a-z0-9-_]*$/, 'Tags can only contain letters, numbers, dashes and underscores.')
        .notOneOf(tags, 'Tag already added.');

    const handleInputChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => {
        setInputValue(event.target.value);
        setInputValidationMessage('');
        tagInputValidation.validate(event.target.value).catch(error => {
            setInputValidationMessage(error.errors[0]);
        });
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
        switch (event.key) {
            case 'Enter': {
                event.preventDefault();
                break;
            }
            case 'Escape': {
                setIsInputClicked(false);
                break;
            }
        }
    };

    const handleAddTag = (newTag: string, arrayHelpers: FieldArrayRenderProps) => {
        if (!newTag || inputValidationMessage) return;
        arrayHelpers.unshift(newTag);
        setInputValue('');
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
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onKeyUp={createHandleKeyUp(arrayHelpers)}
                        onRemoveTag={createHandleRemoveTag(arrayHelpers)}
                        inputValidationMessage={inputValidationMessage}
                        isInputClicked={isInputClicked}
                        onInputClick={() => setIsInputClicked(true)}
                    />
                );
            }}
        </FieldArray>
    );
};

export default AppFormikTagInput;