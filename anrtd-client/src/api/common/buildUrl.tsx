import config from '../../config';

export const buildApiUrl = (path: string): string => `${config.apiBaseUrl}/${path}`;
