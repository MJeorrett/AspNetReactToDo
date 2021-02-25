import { Chip } from '@material-ui/core';
import { ToDoStatus, toDoStatusColors } from '../config/ToDoStatus';

export interface ToDoStatusChipProps {
    status: ToDoStatus,
}
 
const ToDoStatusChip: React.FC<ToDoStatusChipProps> = ({
    status,
}) => {
    return (
        <Chip
            label={ToDoStatus[status]}
            variant="outlined"
            style={{
                borderColor: toDoStatusColors[status],
                color: toDoStatusColors[status],
            }}
        />
    );
};
 
export default ToDoStatusChip;