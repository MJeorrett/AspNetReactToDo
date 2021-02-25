import { ToDoStatus } from '../../config/ToDoStatus';

export interface ApiToDo {
    id: number,
    title: string,
    status: ToDoStatus,
}

export interface ApiCreateToDoDto {
    title: string,
}