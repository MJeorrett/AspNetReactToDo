import { ApiToDoSummary } from '../api/models';
import { ToDoSummary } from '../models/ToDo';

export const mapApiToDoSummary = (apiToDo: ApiToDoSummary): ToDoSummary => ({
    ...apiToDo,
});