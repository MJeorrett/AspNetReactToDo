import { ToDoStatus } from '../../config/ToDoStatus';

export interface ApiToDoSummary {
    id: number,
    title: string,
    status: ToDoStatus,
}

export interface ApiUpdateToDoDto extends ApiToDoSummary {
    dueDate: string | null,
}

export interface ApiToDoDetails extends ApiUpdateToDoDto {
    createdDate: string,
    lastModifiedDate: string | null,
}

export interface ApiCreateToDoDto {
    title: string,
}