import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

export const useDispatchEffect = (actionCreator: () => void) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionCreator());
    }, [dispatch, actionCreator]);
};