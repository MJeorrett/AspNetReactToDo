import config from '../../config';

export const buildApiUrl = (path: string) => `${config.apiBaseUrl}/${path}`;
