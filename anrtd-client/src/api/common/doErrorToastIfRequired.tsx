import { apiErrorToast } from '../../toast';
import { HttpClientResponse } from './httpClient';

export const doErrorToastIfRequired = (response: HttpClientResponse<unknown>): void => {
    if (response.isError) {
        apiErrorToast(response.message);
    }
};
