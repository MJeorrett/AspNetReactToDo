import { Chip } from '@material-ui/core';
import { FieldArray, FieldArrayRenderProps, useField } from 'formik';
import { KeyboardEventHandler, useState } from 'react';
import { warningToast } from '../../toast';
import AppTextField from '../AppForm/AppTextField';

import useStyles from './AppFormikTagInputStyles';

export interface AppFormikTagInputProps {
    name: string,
}

const AppFormikTagInput: React.FC<AppFormikTagInputProps> = ({
    name,
}) => {
    const classes = useStyles();
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

    return (
        <div className={classes.root}>
            <FieldArray name={name}>
                {arrayHelpers => (
                    <>
                        <AppTextField
                            value={inputValue}
                            size="small"
                            fullWidth={false}
                            className={classes.input}
                            onChange={event => setInputValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                            onKeyUp={createHandleKeyUp(arrayHelpers)}
                        />
                        {tags.map(tag => (
                            <Chip
                                key={tag}
                                size="small"
                                label={tag}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </>
                )}
            </FieldArray>
        </div>
    );
};

export default AppFormikTagInput;