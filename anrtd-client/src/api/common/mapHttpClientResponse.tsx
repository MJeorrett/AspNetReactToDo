import { ApiPaginatedResponse } from './ApiPaginatedResponse';
import { HttpClientResponse } from './httpClient';

export function mapHttpClientResponse<TResponse, TMapped>(
    response: HttpClientResponse<TResponse>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<TMapped> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: mapper(response.content)
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}

export function mapHttpClientListResponse<TResponse, TMapped>(
    response: HttpClientResponse<TResponse[]>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<TMapped[]> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: response.content.map(mapper),
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}

export function mapHttpClientPaginatedResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiPaginatedResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<ApiPaginatedResponse<TMapped>> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: {
                ...response.content,
                items: response.content.items.map(mapper),
            },
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}