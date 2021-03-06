import { Chip } from '@material-ui/core';
import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import AppTextField from '../AppForm/AppTextField';

import useStyles from './AppFormikTagInputStyles';

export interface AppFormikTagInputCompProps {
    inputValue: string,
    tags: string[],
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
    onKeyDown: KeyboardEventHandler<HTMLDivElement>,
    onKeyUp: KeyboardEventHandler<HTMLDivElement>,
}

const AppFormikTagInputComp: React.FC<AppFormikTagInputCompProps> = ({
    inputValue,
    tags,
    onChange,
    onKeyDown,
    onKeyUp,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppTextField
                value={inputValue}
                size="small"
                fullWidth={false}
                className={classes.input}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
            />
            {tags.sort((a, b) => a.localeCompare(b)).map(tag => (
                <Chip
                    key={tag}
                    size="small"
                    label={tag}
                    color="primary"
                    variant="outlined"
                />
            ))}
        </div>
    );
};

export default AppFormikTagInputComp;