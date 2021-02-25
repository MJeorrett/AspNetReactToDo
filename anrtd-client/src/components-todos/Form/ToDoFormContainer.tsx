import { Ref } from 'react';
import { Formik, FormikProps } from 'formik';
import ToDoForm, { ToDoFormValues } from './ToDoForm';
import { ToDoStatus } from '../../config/ToDoStatus';

export interface ToDoFormContainerProps {
    onSubmit: (toDo: ToDoFormValues) => Promise<unknown>,
    formikRef?: Ref<FormikProps<ToDoFormValues>>,
    initialValues?: ToDoFormValues,
}

const defaultInitialValues: ToDoFormValues = {
    title: '',
    status: ToDoStatus.New,
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