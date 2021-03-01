import { ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from '@material-ui/core';
import CheckMarkIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import { AppButton } from '../../components/AppButton';
import { ToDoStatus } from '../../config/ToDoStatus';
import ToDoStatusChip from '../ToDoStatusChip';

export interface ToDoStatusFilterOption {
    value: number,
    label: string,
}

export interface ToDoStatusFilterProps {
    options: ToDoStatusFilterOption[],
    selectedStatuses: ToDoStatus[],
    onStatusClick: (clickedStatus: ToDoStatus) => void,
}

const ToDoStatusFilter: React.FC<ToDoStatusFilterProps> = ({
    options,
    selectedStatuses,
    onStatusClick,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStatusClick = (status: ToDoStatus) => {
        console.log(status);
        onStatusClick(status);
    };

    return (
        <>
            <AppButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleButtonClick}
            >
                Filter Status {selectedStatuses.length }/{options.length}
            </AppButton>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                keepMounted
            >
                {options.map(option => (
                    <MenuItem key={option.value}>
                        <ToDoStatusChip status={option.value}
                            onClick={() => handleStatusClick(option.value)}
                            variant={selectedStatuses.includes(option.value) ? 'filled' : 'outlined'}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ToDoStatusFilter;