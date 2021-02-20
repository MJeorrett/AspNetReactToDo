import React from 'react';
import { toast } from 'react-toastify';

export const apiErrorToast = (responseError: string) => {
    errorToast(
        <>
            <p>Sorry there was an error making the request:</p>
            <p>{responseError}</p>
        </>
    );
}

export const errorToast = (message: React.ReactNode) => {
    toast(
        message,
        { type: 'error', position: 'bottom-center' }
    );
}

export const successToast = (message: React.ReactNode) => {
    toast(
        message,
        { type: 'success', position: 'bottom-center', className: 'toastSuccess' }
    )
}