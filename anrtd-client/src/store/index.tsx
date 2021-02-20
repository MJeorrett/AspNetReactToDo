import { configureStore } from '@reduxjs/toolkit';

import * as toDosSlice from './toDos';

const store = configureStore({
    reducer: {
        [toDosSlice.name]: toDosSlice.reducer,
    }
});

export const actions = {
    [toDosSlice.name]: toDosSlice.actions,
};

export const selectors = {
    [toDosSlice.name]: toDosSlice.selectors,
}

export default store;
export * from './utils/useDispatchEffect';