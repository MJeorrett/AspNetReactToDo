import { useEffect, useState } from 'react';
import { HttpClientFailureResponse, HttpClientResponse } from '../common/httpClient';

export interface UseHttpRequest<T> {
    isLoading: boolean,
    httpError?: HttpClientFailureResponse,
    isError: boolean,
    result?: T,
    forceRefresh: () => void,
}

export const useHttpRequest = <T, >(makeRequest: () => Promise<HttpClientResponse<T>>, defaultValue?: T): UseHttpRequest<T> => {
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<HttpClientFailureResponse|undefined>(undefined);
    const [result, setResult] = useState<T|undefined>(defaultValue);
    const [forceRefresh, setForceRefresh] = useState(false);

    useEffect(() => {
        const doRequest = async () => {
            setIsLoading(true);
            setHttpError(undefined);
            const apiResponse = await makeRequest();
            if (apiResponse.isError) {
                setHttpError(apiResponse);
            }
            else {
                setResult(apiResponse.content);
            }
            setIsLoading(false);
        };
        doRequest();
    }, [makeRequest, forceRefresh]);

    return {
        isLoading,
        httpError,
        isError: !!httpError,
        result,
        forceRefresh: () => setForceRefresh(!forceRefresh),
    };
};