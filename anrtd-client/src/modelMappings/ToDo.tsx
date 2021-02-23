import { ApiToDoDetails, ApiToDoSummary } from '../api/models';
import { ToDoDetails, ToDoSummary } from '../models/ToDo';

export const mapApiToDoSummary = (apiToDo: ApiToDoSummary): ToDoSummary => ({
    ...apiToDo,
});

export const mapApiToDoDetails = (apiToDo: ApiToDoDetails): ToDoDetails => ({
    ...apiToDo,
});