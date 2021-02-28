import { ApiToDo, ApiToDoDetails } from '../api/models';
import { ToDo, ToDoDetails } from '../models/ToDo';

export const mapApiToDo = (apiToDo: ApiToDo): ToDo => ({
    ...apiToDo,
});

export const mapApiToDoDetails = (apiToDo: ApiToDoDetails): ToDoDetails => ({
    ...apiToDo,
    created: new Date(apiToDo.created),
});