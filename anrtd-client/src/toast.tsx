import React from 'react';
import { toast } from 'react-toastify';

export const apiErrorToast = (responseError: string): void => {
    errorToast(
        <>
            <p>Sorry there was an error making the request:</p>
            <p>{responseError}</p>
        </>
    );
};

export const errorToast = (message: React.ReactNode): void => {
    toast(
        message,
        { type: 'error', position: 'bottom-center' }
    );
};

export const warningToast = (message: React.ReactNode): void => {
    toast(
        message,
        { type: 'warning', position: 'bottom-center' }
    );
};

export const successToast = (message: React.ReactNode): void => {
    toast(
        message,
        { type: 'success', position: 'bottom-center', className: 'toastSuccess' }
    );
};