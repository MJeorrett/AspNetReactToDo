import { ToDoStatus } from '../config/ToDoStatus';
import { TShirtSize } from '../config/TShirtSize';

export interface ToDoSummary {
    id: number,
    title: string,
    status: ToDoStatus,
}

export interface ToDoDetails extends ToDoSummary {
    tShirtSize?: TShirtSize,
    dueDate: Date | null,
    createdDate: Date,
    lastModifiedDate: Date | null,
}