import { apiErrorToast } from '../../toast';
import { HttpClientResponse } from './httpClient';

export  const doErrorToastIfRequired = (response: HttpClientResponse<any>) => {
    if (response.isError) {
        apiErrorToast(response.message);
    }
}
