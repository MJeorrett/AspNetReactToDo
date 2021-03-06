import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { Chip } from '@material-ui/core';
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
}

const AppFormikTagInputComp: React.FC<AppFormikTagInputCompProps> = ({
    inputValue,
    inputValidationMessage,
    tags,
    onChange,
    onKeyDown,
    onKeyUp,
    onRemoveTag,
}) => {
    const classes = useStyles();
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className={classes.root}>
            {isClicked ?
                <AppTextField
                    value={inputValue}
                    size="small"
                    fullWidth={false}
                    className={classes.input}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    autoFocus
                    helperText={inputValidationMessage}
                    error={!!inputValidationMessage}
                /> :
                <AppButton
                    size="small"
                    variant="outlined"
                    onClick={() => setIsClicked(true)}
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
    );
};

export default AppFormikTagInputComp;