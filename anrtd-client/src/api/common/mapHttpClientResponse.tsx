import { HttpClientResponse } from './httpClient';

export function mapHttpClientResponse<TResponse, TMapped>(
    response: HttpClientResponse<TResponse>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<TMapped> {
    if (response.isError) return response;

    return {
        ...response,
        content: mapper(response.content)
    }
}

export function mapHttpClientListResponse<TResponse, TMapped>(
    response: HttpClientResponse<TResponse[]>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<TMapped[]> {
    if (response.isError) return response;

    return {
        ...response,
        content: response.content.map(mapper),
    }
}