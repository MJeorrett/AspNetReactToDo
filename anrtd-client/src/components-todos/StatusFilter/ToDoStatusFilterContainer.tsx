import { useDispatch, useSelector } from 'react-redux';
import { ToDoStatus } from '../../config/ToDoStatus';
import { mapEnumToOptions } from '../../enumUtils';
import { actions, selectors } from '../../store';
import ToDoStatusFilter from './ToDoStatusFilter';
 
const ToDoStatusFilterContainer: React.FC = () => {
    const dispatch = useDispatch();
    const selectedStatuses = useSelector(selectors.toDos.selectedStatuses);

    const handleToggleStatus = (status: ToDoStatus) => {
        dispatch(actions.toDos.toggleSelectedStatus(status));
    };

    return (
        <ToDoStatusFilter
            options={mapEnumToOptions(ToDoStatus)}
            selectedStatuses={selectedStatuses}
            onStatusClick={handleToggleStatus}
        />
    );
};
 
export default ToDoStatusFilterContainer;