import { Form, FormikProps } from 'formik';
import AppFormikSelect, { mapEnumToAppSelectOptions } from '../../components/AppForm/AppFormikSelect';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';
import { ToDoStatus } from '../../config/ToDoStatus';

export interface ToDoFormValues {
    title: string,
    status: ToDoStatus,
}
 
const ToDoForm: React.FC<FormikProps<ToDoFormValues>> = () => {
    const toDoStatusOptions = mapEnumToAppSelectOptions(ToDoStatus);
    return (
        <Form>
            <AppFormikTextField name="title" label="Title" autoFocus />
            <AppFormikSelect
                name="status"
                label="Status"
                options={toDoStatusOptions}
            />
            <AppFormikSubmitButton variant="contained" color="primary" type="submit">Submit</AppFormikSubmitButton>
        </Form>
    );
};
 
export default ToDoForm;