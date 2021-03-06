import React, { useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import ToDoForm, { ToDoFormValues } from './ToDoForm';
import { ToDoStatus } from '../../config/ToDoStatus';
import { getNumericEnumValues } from '../../enumUtils';
import { TShirtSize } from '../../config/TShirtSize';

export interface ToDoFormContainerProps {
    onSubmit?: (toDo: ToDoFormValues) => Promise<unknown>,
    initialValues?: ToDoFormValues,
    createMode?: boolean,
    autoFocus?: boolean,
    children?: (formikProps: FormikProps<ToDoFormValues>) => React.ReactNode,
}

const defaultInitialValues: ToDoFormValues = {
    title: '',
    status: ToDoStatus.New,
    dueDate: null,
    tShirtSize: -1,
    tags: [],
};

const validationSchema: Yup.SchemaOf<ToDoFormValues> = Yup.object().shape({
    title: Yup.string().required('Please provide a title.'),
    status: Yup.number()
        .oneOf(getNumericEnumValues(ToDoStatus))
        .required(),
    tShirtSize: Yup.number()
        .oneOf([...getNumericEnumValues(TShirtSize), -1])
        .required(),
    dueDate: Yup.date().typeError('Must be a valid date.').nullable().default(null),
    tags: Yup.array().of(Yup.string().required()).required(),
});

const ToDoFormContainer: React.FC<ToDoFormContainerProps> = ({
    onSubmit,
    initialValues,
    createMode,
    autoFocus,
    children,
}) => {
    const [submissionAttempted, setSubmissionAttempted] = useState(false);

    const handleSubmit = (values: ToDoFormValues) => {
        setSubmissionAttempted(true);
        onSubmit && onSubmit(values);
    };

    return (
        <Formik
            initialValues={initialValues || defaultInitialValues}
            validationSchema={validationSchema}
            validateOnBlur={submissionAttempted}
            onSubmit={handleSubmit}
        >
            {formikProps => (
                <Form>
                    {children ?
                        children(formikProps) :
                        <ToDoForm
                            {...formikProps}
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