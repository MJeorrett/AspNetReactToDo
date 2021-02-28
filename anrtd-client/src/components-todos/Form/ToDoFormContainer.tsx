import { Ref } from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import ToDoForm, { ToDoFormValues } from './ToDoForm';
import { ToDoStatus } from '../../config/ToDoStatus';
import { getNumericEnumValues } from '../../enumUtils';

export interface ToDoFormContainerProps {
    onSubmit?: (toDo: ToDoFormValues) => Promise<unknown>,
    formikRef?: Ref<FormikProps<ToDoFormValues>>,
    initialValues?: ToDoFormValues,
    hideReadonlyFields?: boolean,
    autoFocus?: boolean,
}

const defaultInitialValues: ToDoFormValues = {
    title: '',
    status: ToDoStatus.New,
};

const validationSchema: Yup.SchemaOf<ToDoFormValues> = Yup.object().shape({
    title: Yup.string().required('Please provide a title.'),
    status: Yup.number()
        .oneOf(getNumericEnumValues(ToDoStatus))
        .required(),
});
 
const ToDoFormContainer: React.FC<ToDoFormContainerProps> = ({
    onSubmit,
    formikRef,
    initialValues,
    hideReadonlyFields,
    autoFocus,
}) => {
    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues || defaultInitialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit || (() => undefined)}
        >
            {formikProps => (
                <ToDoForm
                    {...formikProps}
                    hideReadonlyFields={!!hideReadonlyFields}
                    autoFocus={!!autoFocus}
                />
            )}
        </Formik>
    );
};
 
export default ToDoFormContainer;