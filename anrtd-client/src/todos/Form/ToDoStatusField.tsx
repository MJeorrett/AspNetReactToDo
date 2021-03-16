import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import { ToDoStatus } from '../../config/ToDoStatus';
import { mapEnumToOptions } from '../../enumUtils';

const ToDoStatusField: React.FC = () => {
    const toDoStatusOptions = mapEnumToOptions(ToDoStatus);

    return (
        <AppFormikSelect
            name="status"
            label="Status"
            options={toDoStatusOptions}
        />
    );
};

export default ToDoStatusField;