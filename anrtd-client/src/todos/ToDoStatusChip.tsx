import { Chip } from '@material-ui/core';
import { ToDoStatus, useToDoStatusColors } from '../config/ToDoStatus';

export interface ToDoStatusChipProps {
    status: ToDoStatus,
    onClick?: () => void,
    variant?: 'outlined'|'filled',
}
 
const ToDoStatusChip: React.FC<ToDoStatusChipProps> = ({
    status,
    onClick,
    variant = 'outlined',
}) => {
    const toDoStatusColors = useToDoStatusColors();
    const isFilled = variant !== 'outlined';
    const statusColor = toDoStatusColors[status];
    
    return (
        <Chip
            label={ToDoStatus[status]}
            variant="outlined"
            style={{
                borderColor: statusColor,
                backgroundColor: isFilled ? statusColor : undefined,
                color: isFilled ? 'white' : statusColor,
                width: '85px',
            }}
            onClick={onClick}
        />
    );
};
 
export default ToDoStatusChip;