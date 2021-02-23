import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClientFailureResponse, HttpClientResponse } from '../../api';


export function createHttpClientThunk<Returned, ThunkArg = void>(
    typePrefix: string,
    makeHttpCall: (arg: ThunkArg) => Promise<HttpClientResponse<Returned>>,
): AsyncThunk<
    Returned,
    ThunkArg,
    {
        rejectValue: HttpClientFailureResponse,
    }> {
    return createAsyncThunk<
        Returned,
        ThunkArg,
        {
            rejectValue: HttpClientFailureResponse,
        }
    >(
        typePrefix,
        async (arg, { rejectWithValue }) => {
            const response = await makeHttpCall(arg);
            if (response.isError) {
                return rejectWithValue(response);
            }
            return response.content;
        }
    );
}