import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux'

export const useDispatchEffect = (actionCreator: () => void) => {
    const dispatch = useDispatch();

    const dispatchAction = useCallback(() => dispatch(actionCreator()), [actionCreator]);

    useEffect(() => {
        dispatchAction();
    }, [dispatchAction]);

    return dispatchAction;
};