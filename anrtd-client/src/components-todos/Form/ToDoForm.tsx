import { FormikProps } from 'formik';
import { AppButtons } from '../../components/AppButton';
import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import { ToDoStatus } from '../../config/ToDoStatus';
import { mapEnumToOptions } from '../../enumUtils';

export type ToDoFormValues = {
    title: string,
    status: ToDoStatus,
    dueDate: Date | null,
}

export type ToDoFormOtherProps = {
    createMode?: boolean,
    autoFocus?: boolean,
    showSubmit?: boolean,
}

const ToDoForm: React.FC<ToDoFormOtherProps & FormikProps<ToDoFormValues>> = ({
    createMode,
    autoFocus,
    showSubmit,
}) => {
    const toDoStatusOptions = mapEnumToOptions(ToDoStatus);
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
                    <AppFormikDatePicker name="dueDate" label="Due Date" />
                    <AppFormikDatePicker name="createdDate" label="Created Date" readonly />
                    <AppFormikDatePicker name="lastModifiedDate" label="Last Modified Date" readonly />
                </>
            )}

            {showSubmit && (
                <AppButtons>
                    <AppFormikSubmitButton variant="contained" color="primary" type="submit">Submit</AppFormikSubmitButton>
                </AppButtons>
            )}
        </>
    );
};

export default ToDoForm;