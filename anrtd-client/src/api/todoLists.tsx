import { ToDoListSummary, ToDoListDetails } from '../models/ToDoList';
import { ApiPaginatedResponse, ApiPaginationQueryParams, buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientPaginatedResponse, mapHttpClientResponse } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiCreateToDoListDto, ApiToDoListSummary, ApiToDoListDetails, ApiUpdateToDoListDto } from './models';

export const getPaginatedToDoLists = async ({ pageIndex: pageNumber, pageSize }: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedResponse<ToDoListSummary>>> => {
    const queryParameters = [
        `pageNumber=${pageNumber}`,
        `pageSize=${pageSize}`,
    ];

    const url = buildApiUrl(`api/todo-lists?${queryParameters.join('&')}`);
    const response = await httpClient.getRequest<ApiPaginatedResponse<ApiToDoListSummary>>(url);

    doErrorToastIfRequired(response);
    
    return mapHttpClientPaginatedResponse(response, x => x);
};

export const getToDoListById = async (toDoListId: number): Promise<HttpClientResponse<ToDoListDetails>> => {
    const url = buildApiUrl(`api/todo-lists/${toDoListId}`);
    const response = await httpClient.getRequest<ApiToDoListDetails>(url);

    doErrorToastIfRequired(response);

    return mapHttpClientResponse(response, x => x);
};

export const createToDo = async (dto: ApiCreateToDoListDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl('api/todo-lists');
    const response = await httpClient.postRequest<number>(url, dto);
    
    doErrorToastIfRequired(response);
    
    return response;
};

export const updateToDoList = async (dto: ApiUpdateToDoListDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl('api/todo-lists');
    const response = await httpClient.putRequest<number>(url, dto);
    
    doErrorToastIfRequired(response);
    
    return response;
};

export const deleteToDoList = async (toDoListId: number): Promise<HttpClientResponse<unknown>> => {
    const url = buildApiUrl(`api/todo-lists/${toDoListId}`);
    const response = await httpClient.deleteRequest(url);
    
    doErrorToastIfRequired(response);
    
    return response;
};