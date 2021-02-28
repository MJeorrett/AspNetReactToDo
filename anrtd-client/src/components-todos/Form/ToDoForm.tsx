import { Form, FormikProps } from 'formik';
import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import { ToDoStatus } from '../../config/ToDoStatus';
import { mapEnumToAppSelectOptions } from '../../enumUtils';

export type ToDoFormValues = {
    title: string,
    status: ToDoStatus,
}

export type ToDoFormOtherProps = {
    hideReadonlyFields: boolean,
    autoFocus: boolean,
}

const ToDoForm: React.FC<ToDoFormOtherProps & FormikProps<ToDoFormValues>> = ({
    hideReadonlyFields,
    autoFocus,
}) => {
    const toDoStatusOptions = mapEnumToAppSelectOptions(ToDoStatus);
    return (
        <Form>
            <AppFormikTextField name="title" label="Title" autoFocus={autoFocus} />
            <AppFormikSelect
                name="status"
                label="Status"
                options={toDoStatusOptions}
            />
            {!hideReadonlyFields && (
                <>
                    <AppFormikDatePicker name="created" label="Created Date" readonly />
                    <AppFormikDatePicker name="lastModified" label="Last Modified Date" readonly />
                </>
            )}

            <AppFormikSubmitButton variant="contained" color="primary" type="submit">Submit</AppFormikSubmitButton>
        </Form>
    );
};

export default ToDoForm;