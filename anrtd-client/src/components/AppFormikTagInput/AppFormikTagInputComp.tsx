import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { Chip, FormHelperText } from '@material-ui/core';
import AppButton from '../AppButton';
import AppTextField from '../AppForm/AppTextField';

import useStyles from './AppFormikTagInputStyles';

export interface AppFormikTagInputCompProps {
    inputValue: string,
    inputValidationMessage?: string,
    tags: string[],
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
    onKeyDown: KeyboardEventHandler<HTMLDivElement>,
    onKeyUp: KeyboardEventHandler<HTMLDivElement>,
    onRemoveTag: (tagIndex: number) => void,
    isInputClicked: boolean,
    onInputClick: () => void,
}

const AppFormikTagInputComp: React.FC<AppFormikTagInputCompProps> = ({
    inputValue,
    inputValidationMessage,
    tags,
    onChange,
    onKeyDown,
    onKeyUp,
    onRemoveTag,
    onInputClick,
    isInputClicked,
}) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                {isInputClicked ?
                    <AppTextField
                        value={inputValue}
                        size="small"
                        fullWidth={false}
                        className={classes.input}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        autoFocus
                    /> :
                    <AppButton
                        size="small"
                        variant="outlined"
                        onClick={onInputClick}
                    >
                        Add Tag
                    </AppButton>
                }
                {tags.sort((a, b) => a.localeCompare(b)).map((tag, index) => (
                    <Chip
                        key={tag}
                        size="small"
                        label={tag}
                        color="primary"
                        variant="outlined"
                        onDelete={() => onRemoveTag(index)}
                    />
                ))}
            </div>
            <FormHelperText
                error={!!inputValidationMessage}
            >
                {inputValidationMessage}
            </FormHelperText>
        </div>
    );
};

export default AppFormikTagInputComp;