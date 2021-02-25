import { ToDoStatus } from '../config/ToDoStatus';

export interface ToDo {
    id: number,
    title: string,
    status: ToDoStatus,
}