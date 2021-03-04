import React, { Ref } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import ToDoForm, { ToDoFormValues } from './ToDoForm';
import { ToDoStatus } from '../../config/ToDoStatus';
import { getNumericEnumValues } from '../../enumUtils';

export interface ToDoFormContainerProps {
    onSubmit?: (toDo: ToDoFormValues) => Promise<unknown>,
    formikRef?: Ref<FormikProps<ToDoFormValues>>,
    initialValues?: ToDoFormValues,
    createMode?: boolean,
    autoFocus?: boolean,
    children?: (formikProps: FormikProps<ToDoFormValues>) => React.ReactNode,
}

const defaultInitialValues: ToDoFormValues = {
    title: '',
    status: ToDoStatus.New,
    dueDate: null,
};

const validationSchema: Yup.SchemaOf<ToDoFormValues> = Yup.object().shape({
    title: Yup.string().required('Please provide a title.'),
    status: Yup.number()
        .oneOf(getNumericEnumValues(ToDoStatus))
        .required(),
    dueDate: Yup.date().typeError('Must be a valid date.').nullable().default(null),
});

const ToDoFormContainer: React.FC<ToDoFormContainerProps> = ({
    onSubmit,
    formikRef,
    initialValues,
    createMode,
    autoFocus,
    children,
}) => {
    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues || defaultInitialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit || (() => undefined)}
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