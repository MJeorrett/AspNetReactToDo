import { useState } from 'react';
import { Form, Formik } from 'formik';

import { defaultToDoFormValues, ToDoFormValues, toDoFormValidationSchema } from './ToDoFormValues';

export interface ToDoFormProps {
    onSubmit: (toDo: ToDoFormValues) => Promise<unknown>,
    initialValues?: ToDoFormValues,
}

const ToDoForm: React.FC<ToDoFormProps> = ({
    onSubmit,
    initialValues,
    children,
}) => {
    const [submissionAttempted, setSubmissionAttempted] = useState(false);

    const handleSubmit = async (values: ToDoFormValues) => {
        setSubmissionAttempted(true);
        await onSubmit(values);
    };

    return (
        <Formik
            initialValues={initialValues || defaultToDoFormValues}
            validationSchema={toDoFormValidationSchema}
            validateOnBlur={submissionAttempted}
            onSubmit={handleSubmit}
        >
            <Form>
                {children}
            </Form>
        </Formik>
    );
};

export default ToDoForm;