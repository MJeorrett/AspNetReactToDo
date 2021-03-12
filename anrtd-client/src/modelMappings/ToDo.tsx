import { ApiToDoSummary, ApiToDoDetails, ApiUpdateToDoDto } from '../api/models';
import { ToDoFormValues } from '../todos/Form';
import { ToDoSummary, ToDoDetails } from '../models/ToDo';
import { parseApiDate, parseNullableApiDate } from './common/parseApiDate';

export const mapApiToDo = (apiToDo: ApiToDoSummary): ToDoSummary => ({
    ...apiToDo,
});

export const mapFromApiToDoDetails = ({
    tShirtSize,
    dueDate,
    createdDate,
    lastModifiedDate,
    ...rest
}: ApiToDoDetails): ToDoDetails => ({
    ...rest,
    tShirtSize: tShirtSize === null ? -1 : tShirtSize,
    dueDate: parseNullableApiDate(dueDate),
    createdDate: parseApiDate(createdDate),
    lastModifiedDate: parseNullableApiDate(lastModifiedDate),
});

export const mapToApiUpdateToDo = (id: number, {
    tShirtSize,
    dueDate,
    ...rest
}: ToDoFormValues): ApiUpdateToDoDto => ({
    ...rest,
    id,
    tShirtSize: tShirtSize === -1 ? null : tShirtSize,
    dueDate: dueDate?.toISOString() || null,
});
