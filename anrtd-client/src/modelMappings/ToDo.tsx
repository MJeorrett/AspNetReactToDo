import { ApiToDo, ApiToDoDetails } from '../api/models';
import { ToDo, ToDoDetails } from '../models/ToDo';
import { parseApiDate, parseNullableApiDate } from './common/parseApiDate';

export const mapApiToDo = (apiToDo: ApiToDo): ToDo => ({
    ...apiToDo,
});

export const mapApiToDoDetails = (apiToDo: ApiToDoDetails): ToDoDetails => ({
    ...apiToDo,
    created: parseApiDate(apiToDo.created),
    lastModified: parseNullableApiDate(apiToDo.lastModified),
});