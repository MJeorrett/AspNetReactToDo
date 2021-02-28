import { ToDoStatus } from '../config/ToDoStatus';

export interface ToDoSummary {
    id: number,
    title: string,
    status: ToDoStatus,
}

export interface ToDoDetails extends ToDoSummary {
    dueDate: Date | null,
    createdDate: Date,
    lastModifiedDate: Date | null,
}