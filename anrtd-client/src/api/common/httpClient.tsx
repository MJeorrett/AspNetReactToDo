import Axios, { AxiosError } from 'axios';

export interface HttpClientSuccessResponse<T> {
    isError: false,
    statusCode: number,
    content: T,
}

export interface HttpClientFailureResponse {
    isError: true,
    statusCode?: number,
    message: string,
}

export type HttpClientResponse<T> = HttpClientSuccessResponse<T> | HttpClientFailureResponse;

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

function handleError<T>(url: string, error: any): HttpClientResponse<T> {
    if (isAxiosError(error)) {
        if (error.response) {
            const message = `Request to ${url} failed with status ${error.response.status}.`;
            console.error(message);
            console.error('Error details:', error.response.data);
            return {
                isError: true,
                statusCode: error.response.status,
                message,
            };
        } else if (error.request) {
            const message = `Request to ${url} failed, no response received.`;
            console.error(message);
            console.error('Request:', error.request);
            return {
                isError: true,
                message,
            };
        } else {
            const message = `Request failed with unknown error: ${error.message}`;
            console.error(message);
            return {
                isError: true,
                message,
            };
        }
    }
    console.error(`Unknown error occurred making request to ${url}.`);
    console.error('Error config: ', error.config);
    throw error;
}

const buildDefaultHeaders = () => {
    // placeholder this is where we would add e.g. auth token.
    const headers = {

    };

    return headers;
};

export async function getRequest<TResponse>(url: string, allowedNon200Statuses: number[] = []): Promise<HttpClientResponse<TResponse>> {
    try {
        const response = await Axios.get(url,
            {
                headers: buildDefaultHeaders(),
                validateStatus: status => (status >= 200 && status <= 299) || allowedNon200Statuses.includes(status),
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            content: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function postRequest<TResponse>(url: string, payload?: unknown): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.post(url, payload,
            {
                headers: buildDefaultHeaders(),
                validateStatus: status => status >= 200 && status <= 299,
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            content: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function putRequest<TResponse>(url: string, payload?: unknown): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.put(url, payload,
            {
                headers: buildDefaultHeaders(),
                validateStatus: status => status >= 200 && status <= 299,
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            content: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function patchRequest<TResponse>(url: string, payload?: unknown): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.patch(url, payload,
            {
                headers: buildDefaultHeaders(),
                validateStatus: status => status >= 200 && status <= 299,
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            content: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function deleteRequest<TResponse>(url: string): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.delete(url,
            {
                headers: buildDefaultHeaders(),
                validateStatus: status => status >= 200 && status <= 299,
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            content: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}