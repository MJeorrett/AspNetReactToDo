import { Typography } from '@material-ui/core';

import AppLoader from './AppLoader';

interface ApiErrorLoaderWrapperProps {
    isFetching: boolean,
    isError: boolean
}

const ApiResponseWrapper: React.FC<ApiErrorLoaderWrapperProps> = ({
    isFetching,
    isError,
    children,
}) => {
    if (isFetching) {
        return <AppLoader />
    }

    if (isError) {
        return (
            <>
                <Typography align="center" color="error">error, please try again</Typography>
            </>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default ApiResponseWrapper;