import { mapApiToDo, mapApiToDoDetails } from '../modelMappings/ToDo';
import { ToDo, ToDoDetails } from '../models/ToDo';
import { ApiPaginatedResponse, ApiPaginationQueryParams, buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientPaginatedResponse, mapHttpClientResponse } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiCreateToDoDto, ApiToDo, ApiToDoDetails } from './models';

export const getPaginatedToDos = async ({ pageIndex: pageNumber, pageSize }: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedResponse<ToDo>>> => {
    const url = buildApiUrl(`api/todos?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const response = await httpClient.getRequest<ApiPaginatedResponse<ApiToDo>>(url);

    doErrorToastIfRequired(response);
    
    return mapHttpClientPaginatedResponse(response, mapApiToDo);
};

export const getToDoById = async (toDoId: number): Promise<HttpClientResponse<ToDoDetails>> => {
    const url = buildApiUrl(`api/todos/${toDoId}`);
    const response = await httpClient.getRequest<ApiToDoDetails>(url);

    doErrorToastIfRequired(response);

    return mapHttpClientResponse(response, mapApiToDoDetails);
};

export const createToDo = async (dto: ApiCreateToDoDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl('api/todos');
    const response = await httpClient.postRequest<number>(url, dto);
    
    doErrorToastIfRequired(response);
    
    return response;
};

export const updateToDo = async (dto: ApiToDo): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl('api/todos');
    const response = await httpClient.putRequest<number>(url, dto);
    
    doErrorToastIfRequired(response);
    
    return response;
};

export const deleteToDo = async (toDoId: number): Promise<HttpClientResponse<unknown>> => {
    const url = buildApiUrl(`api/todos/${toDoId}`);
    const response = await httpClient.deleteRequest(url);
    
    doErrorToastIfRequired(response);
    
    return response;
};