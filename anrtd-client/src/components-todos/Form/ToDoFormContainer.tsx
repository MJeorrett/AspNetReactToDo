import { Ref } from 'react';
import { Formik, FormikProps } from 'formik';
import ToDoForm, { ToDoFormValues } from './ToDoForm';

export interface ToDoFormContainerProps {
    onSubmit: (toDo: ToDoFormValues) => Promise<unknown>,
    formikRef?: Ref<FormikProps<ToDoFormValues>>,
    initialValues?: ToDoFormValues,
}

const defaultInitialValues: ToDoFormValues = {
    title: '',
};
 
const ToDoFormContainer: React.FC<ToDoFormContainerProps> = ({
    onSubmit,
    formikRef,
    initialValues,
}) => {
    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues || defaultInitialValues}
            onSubmit={onSubmit}
        >
            {formikProps => (
                <ToDoForm {...formikProps} />
            )}
        </Formik>
    );
};
 
export default ToDoFormContainer;