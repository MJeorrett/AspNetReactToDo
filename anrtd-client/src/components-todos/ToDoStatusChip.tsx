import { Chip } from '@material-ui/core';
import { ToDoStatus, useToDoStatusColors } from '../config/ToDoStatus';

export interface ToDoStatusChipProps {
    status: ToDoStatus,
}
 
const ToDoStatusChip: React.FC<ToDoStatusChipProps> = ({
    status,
}) => {
    const toDoStatusColors = useToDoStatusColors();
    
    return (
        <Chip
            label={ToDoStatus[status]}
            variant="outlined"
            style={{
                borderColor: toDoStatusColors[status],
                color: toDoStatusColors[status],
                width: '85px',
            }}
        />
    );
};
 
export default ToDoStatusChip;