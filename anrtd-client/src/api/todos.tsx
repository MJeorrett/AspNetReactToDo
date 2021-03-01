import { ToDoStatus } from '../config/ToDoStatus';
import { mapApiToDo, mapApiToDoDetails } from '../modelMappings/ToDo';
import { ToDoSummary, ToDoDetails } from '../models/ToDo';
import { ApiPaginatedResponse, ApiPaginationQueryParams, buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientPaginatedResponse, mapHttpClientResponse } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiCreateToDoDto, ApiToDoSummary, ApiToDoDetails } from './models';

export interface ApiGetPaginatedToDosQueryParams extends ApiPaginationQueryParams {
    toDoStatuses: ToDoStatus[],
}

export const getPaginatedToDos = async ({ pageIndex: pageNumber, pageSize, toDoStatuses }: ApiGetPaginatedToDosQueryParams): Promise<HttpClientResponse<ApiPaginatedResponse<ToDoSummary>>> => {
    const queryParameters = [
        `pageNumber=${pageNumber}`,
        `pageSize=${pageSize}`,
    ];

    if (toDoStatuses.length > 0) queryParameters.push(`statusIds=${toDoStatuses.join(',')}`); 

    const url = buildApiUrl(`api/todos?${queryParameters.join('&')}`);
    const response = await httpClient.getRequest<ApiPaginatedResponse<ApiToDoSummary>>(url);

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

export const updateToDo = async (dto: ApiToDoSummary): Promise<HttpClientResponse<number>> => {
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