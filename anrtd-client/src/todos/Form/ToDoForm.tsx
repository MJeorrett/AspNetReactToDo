import { useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';

import { defaultToDoFormValues, ToDoFormValues, toDoFormValidationSchema } from './ToDoFormValues';
import ToDoForm from './ToDoFormComp';

export interface ToDoFormProps {
    onSubmit?: (toDo: ToDoFormValues) => Promise<unknown>,
    initialValues?: ToDoFormValues,
    createMode?: boolean,
    autoFocus?: boolean,
    children?: (formikProps: FormikProps<ToDoFormValues>) => React.ReactNode,
}

const ToDoFormContainer: React.FC<ToDoFormProps> = ({
    onSubmit,
    initialValues,
    createMode,
    autoFocus,
    children,
}) => {
    const [submissionAttempted, setSubmissionAttempted] = useState(false);

    const handleSubmit = async (values: ToDoFormValues) => {
        setSubmissionAttempted(true);
        onSubmit && await onSubmit(values);
    };

    return (
        <Formik
            initialValues={initialValues || defaultToDoFormValues}
            validationSchema={toDoFormValidationSchema}
            validateOnBlur={submissionAttempted}
            onSubmit={handleSubmit}
        >
            {formikProps => (
                <Form>
                    {children ?
                        children(formikProps) :
                        <ToDoForm
                            createMode={!!createMode}
                            autoFocus={!!autoFocus}
                        />
                    }
                </Form>
            )}
        </Formik>
    );
};

export default ToDoFormContainer;