import { FormikProps } from 'formik';
import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import { ToDoStatus } from '../../config/ToDoStatus';
import { TShirtSize } from '../../config/TShirtSize';
import { mapEnumToOptions } from '../../enumUtils';

export type ToDoFormValues = {
    title: string,
    status: ToDoStatus,
    dueDate: Date | null,
}

export type ToDoFormOtherProps = {
    createMode?: boolean,
    autoFocus?: boolean,
}

const ToDoForm: React.FC<ToDoFormOtherProps & FormikProps<ToDoFormValues>> = ({
    createMode,
    autoFocus,
}) => {
    const toDoStatusOptions = mapEnumToOptions(ToDoStatus);
    const tShirtSizeOptions = mapEnumToOptions(TShirtSize);

    return (
        <>
            <AppFormikTextField name="title" label="Title" autoFocus={autoFocus} />
            {!createMode && (
                <>
                    <AppFormikSelect
                        name="status"
                        label="Status"
                        options={toDoStatusOptions}
                    />
                    <AppFormikSelect
                        name="tShirtSize"
                        label="T-shirt size"
                        options={tShirtSizeOptions}
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