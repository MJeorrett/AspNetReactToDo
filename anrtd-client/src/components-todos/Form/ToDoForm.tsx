import { Form, FormikProps } from 'formik';
import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import { ToDoStatus } from '../../config/ToDoStatus';
import { mapEnumToAppSelectOptions } from '../../enumUtils';

export type ToDoFormValues = {
    title: string,
    status: ToDoStatus,
}

type OtherProps = {

}

const ToDoForm: React.FC<OtherProps & FormikProps<ToDoFormValues>> = () => {
    const toDoStatusOptions = mapEnumToAppSelectOptions(ToDoStatus);
    return (
        <Form>
            <AppFormikTextField name="title" label="Title" autoFocus />
            <AppFormikSelect
                name="status"
                label="Status"
                options={toDoStatusOptions}
            />
            <AppFormikTextField name="created" label="Created Date" readonly />
            <AppFormikTextField name="lastModified" label="Last Modified Date" readonly />

            <AppFormikSubmitButton variant="contained" color="primary" type="submit">Submit</AppFormikSubmitButton>
        </Form>
    );
};

export default ToDoForm;