import * as Yup from 'yup';

import { ToDoStatus } from '../../config/ToDoStatus';
import { TShirtSize } from '../../config/TShirtSize';
import { getNumericEnumValues } from '../../enumUtils';

export type ToDoFormValues = {
    title: string,
    status: ToDoStatus,
    tShirtSize: TShirtSize | -1,
    dueDate: Date | null,
    tags: string[],
}

export const defaultToDoFormValues: ToDoFormValues = {
    title: '',
    status: ToDoStatus.New,
    dueDate: null,
    tShirtSize: -1,
    tags: [],
};

export const toDoFormValidationSchema: Yup.SchemaOf<ToDoFormValues> = Yup.object().shape({
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