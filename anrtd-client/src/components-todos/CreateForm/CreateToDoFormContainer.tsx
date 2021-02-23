import { Ref } from 'react';
import { Formik, FormikProps } from 'formik';
import { HttpClientResponse } from '../../api';
import CreateToDoForm, { CreateToDoFormValues } from './CreateToDoForm';

export interface CreateToDoFormContainerProps {
    onSubmit: (toDo: CreateToDoFormValues) => Promise<HttpClientResponse<unknown>>,
    formikRef?: Ref<FormikProps<CreateToDoFormValues>>,
}

const initialValues: CreateToDoFormValues = {
    title: '',
};
 
const CreateToDoFormContainer: React.FC<CreateToDoFormContainerProps> = ({
    onSubmit,
    formikRef,
}) => {
    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {formikProps => (
                <CreateToDoForm {...formikProps} />
            )}
        </Formik>
    );
};
 
export default CreateToDoFormContainer;