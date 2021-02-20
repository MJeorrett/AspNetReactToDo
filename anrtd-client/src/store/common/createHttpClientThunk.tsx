import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClientFailureResponse, HttpClientResponse } from '../../api';


export function createHttpClientThunk<Returned, ThunkArg = void>(
    typePrefix: string,
    makeHttpCall: (arg: ThunkArg) => Promise<HttpClientResponse<Returned>>,
) {
    return createAsyncThunk<
        Returned,
        ThunkArg,
        {
            rejectValue: HttpClientFailureResponse,
        }
    >(
        typePrefix,
        async (arg, { rejectWithValue }) => {
            var response = await makeHttpCall(arg);
            if (response.isError) {
                return rejectWithValue(response);
            }
            return response.content;
        }
    )
}