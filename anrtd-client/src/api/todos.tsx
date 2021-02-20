import { mapApiToDoSummary } from '../modelMappings/ToDo';
import { buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientListResponse } from './common';
import { ApiCreateToDoDto, ApiToDoSummary } from './models';

export const getAllToDos = async () => {
    const url = buildApiUrl(`api/todos`);
    const response = await httpClient.getRequest<ApiToDoSummary[]>(url);

    doErrorToastIfRequired(response);
    
    return mapHttpClientListResponse(response, mapApiToDoSummary);
}

export const createCustomer = async (dto: ApiCreateToDoDto) => {
    const url = buildApiUrl('api/todos');
    const response = await httpClient.postRequest<number>(url, dto);
    
    doErrorToastIfRequired(response);
    
    return response;
}