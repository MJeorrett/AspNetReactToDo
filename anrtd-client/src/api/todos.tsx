import { mapApiToDoDetails, mapApiToDoSummary } from '../modelMappings/ToDo';
import { ToDoSummary } from '../models/ToDo';
import { ApiPaginatedResponse, ApiPaginationQueryParams, buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientPaginatedResponse, mapHttpClientResponse } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiCreateToDoDto, ApiToDoDetails, ApiToDoSummary } from './models';

export const getPaginatedToDos = async ({ pageIndex: pageNumber, pageSize }: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedResponse<ToDoSummary>>> => {
    const url = buildApiUrl(`api/todos?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const response = await httpClient.getRequest<ApiPaginatedResponse<ApiToDoSummary>>(url);

    doErrorToastIfRequired(response);
    
    return mapHttpClientPaginatedResponse(response, mapApiToDoSummary);
};

export const getToDoById = async (toDoId: number): Promise<HttpClientResponse<ApiToDoDetails>> => {
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

export const deleteToDo = async (toDoId: number): Promise<HttpClientResponse<unknown>> => {
    const url = buildApiUrl(`api/todos/${toDoId}`);
    const response = await httpClient.deleteRequest(url);
    
    doErrorToastIfRequired(response);
    
    return response;
};