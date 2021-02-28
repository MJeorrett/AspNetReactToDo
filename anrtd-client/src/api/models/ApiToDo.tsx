import { ToDoStatus } from '../../config/ToDoStatus';

export interface ApiToDo {
    id: number,
    title: string,
    status: ToDoStatus,
}

export interface ApiToDoDetails extends ApiToDo {
    createdDate: string,
    lastModifiedDate?: string,
}

export interface ApiCreateToDoDto {
    title: string,
}