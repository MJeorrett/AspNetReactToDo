import { configureStore } from '@reduxjs/toolkit';

import * as toDos from './toDos';
import * as toDoLists from './toDoLists';

const store = configureStore({
    reducer: {
        [toDos.name]: toDos.reducer,
        [toDoLists.name]: toDoLists.reducer,
    }
});

export const actions = {
    [toDos.name]: toDos.actions,
    [toDoLists.name]: toDoLists.actions,
};

export const selectors = {
    [toDos.name]: toDos.selectors,
    [toDoLists.name]: toDoLists.selectors,
};

export default store;
export * from './utils/useDispatchEffect';