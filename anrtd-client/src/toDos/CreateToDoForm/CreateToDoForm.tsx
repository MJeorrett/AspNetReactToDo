import { Button, TextField } from '@material-ui/core';
import { Form, FormikProps } from 'formik';

export interface CreateToDoFormValues {
    title: string,
}
 
const CreateToDoForm: React.FC<FormikProps<CreateToDoFormValues>> = ({
    getFieldProps
}) => {
    const titleProps = getFieldProps('title');
    return (
        <Form>
            <TextField {...titleProps} fullWidth label="Title" />
            <Button type="submit">Submit</Button>
        </Form>
    );
}
 
export default CreateToDoForm;