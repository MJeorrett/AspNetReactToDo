import { Button } from '@material-ui/core';
import { Form, FormikProps } from 'formik';
import AppFormikSubmitButton from '../../components/AppForm.tsx/AppFormikSubmitButton';
import AppFormikTextField from '../../components/AppForm.tsx/AppFormikTextField';

export interface CreateToDoFormValues {
    title: string,
}
 
const CreateToDoForm: React.FC<FormikProps<CreateToDoFormValues>> = () => {
    return (
        <Form>
            <AppFormikTextField name="title" label="Title" autoFocus />
            <AppFormikSubmitButton variant="contained" color="primary" type="submit">Submit</AppFormikSubmitButton>
        </Form>
    );
}
 
export default CreateToDoForm;