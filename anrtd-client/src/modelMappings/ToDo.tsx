import { ApiToDoSummary, ApiToDoDetails } from '../api/models';
import { ToDoSummary, ToDoDetails } from '../models/ToDo';
import { parseApiDate, parseNullableApiDate } from './common/parseApiDate';

export const mapApiToDo = (apiToDo: ApiToDoSummary): ToDoSummary => ({
    ...apiToDo,
});

export const mapApiToDoDetails = (apiToDo: ApiToDoDetails): ToDoDetails => ({
    ...apiToDo,
    dueDate: parseNullableApiDate(apiToDo.dueDate),
    createdDate: parseApiDate(apiToDo.createdDate),
    lastModifiedDate: parseNullableApiDate(apiToDo.lastModifiedDate),
});