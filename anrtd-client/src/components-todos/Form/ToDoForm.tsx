import { Form, FormikProps } from 'formik';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppFormikTextField from '../../components/AppForm/AppFormikTextField';

export interface ToDoFormValues {
    title: string,
}
 
const ToDoForm: React.FC<FormikProps<ToDoFormValues>> = () => {
    return (
        <Form>
            <AppFormikTextField name="title" label="Title" autoFocus />
            <AppFormikSubmitButton variant="contained" color="primary" type="submit">Submit</AppFormikSubmitButton>
        </Form>
    );
};
 
export default ToDoForm;