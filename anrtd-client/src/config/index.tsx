import MissingConfigError from './MissingConfigError';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

if (!apiBaseUrl) throw new MissingConfigError('REACT_APP_API_BASE_URL');

const config = {
    apiBaseUrl,
};

export default config;