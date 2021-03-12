import { useField } from 'formik';

import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import AppFormikTagInput from '../../components/AppFormikTagInput';
import { ToDoStatus } from '../../config/ToDoStatus';
import { TShirtSize } from '../../config/TShirtSize';
import { mapEnumToOptions } from '../../enumUtils';

export type ToDoFormCompOtherProps = {
    createMode?: boolean,
    autoFocus?: boolean,
}

const ToDoForm: React.FC<ToDoFormCompOtherProps> = ({
    createMode,
    autoFocus,
}) => {
    const toDoStatusOptions = mapEnumToOptions(ToDoStatus);
    const tShirtSizeOptions = mapEnumToOptions(TShirtSize);
    const [{value: tShirtSize}] = useField<TShirtSize>('tShirtSize');

    return (
        <>
            <AppFormikTextField name="title" label="Title" autoFocus={autoFocus} />
            {!createMode && (
                <>
                    <AppFormikTagInput name="tags" />
                    <AppFormikSelect
                        name="status"
                        label="Status"
                        options={toDoStatusOptions}
                    />
                    <AppFormikSelect
                        name="tShirtSize"
                        label="T-shirt size"
                        options={tShirtSizeOptions}
                        showPleaseSelect
                        pleaseSelectText={tShirtSize > -1 ? 'None' : undefined}
                    />
                    <AppFormikDatePicker name="dueDate" label="Due Date" />
                    <AppFormikDatePicker name="createdDate" label="Created Date" readonly />
                    <AppFormikDatePicker name="lastModifiedDate" label="Last Modified Date" readonly />
                </>
            )}
        </>
    );
};

export default ToDoForm;