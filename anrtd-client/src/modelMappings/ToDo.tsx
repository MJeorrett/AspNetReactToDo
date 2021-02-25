import { ApiToDo } from '../api/models';
import { ToDo } from '../models/ToDo';

export const mapApiToDoSummary = (apiToDo: ApiToDo): ToDo => ({
    ...apiToDo,
});

export const mapApiToDoDetails = (apiToDo: ApiToDo): ToDo => ({
    ...apiToDo,
});