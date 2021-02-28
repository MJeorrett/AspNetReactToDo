import { ToDoStatus } from '../config/ToDoStatus';

export interface ToDo {
    id: number,
    title: string,
    status: ToDoStatus,
}

export interface ToDoDetails extends ToDo {
    createdDate: Date,
    lastModifiedDate?: Date,
}