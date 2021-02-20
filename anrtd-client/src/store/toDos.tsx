import { createEntityAdapter, createSelector, createSlice, EntityState } from '@reduxjs/toolkit';
import { getAllToDos } from '../api/todos';
import { ToDoSummary } from '../models/ToDo';
import { createHttpClientThunk } from './common/createHttpClientThunk';

const sliceName = 'toDos';

const fetchAllAsyncThunk = createHttpClientThunk(
    `${sliceName}/fetchAll`,
    getAllToDos,
);

const entityAdapter = createEntityAdapter<ToDoSummary>({
    selectId: toDo => toDo.id,
});

type SliceState = {
    entityState: EntityState<ToDoSummary>,
    isFetching: boolean,
    isError: boolean,
}

const initialState: SliceState = {
    entityState: entityAdapter.getInitialState(),
    isFetching: false,
    isError: false,
}

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAllAsyncThunk.pending, state => {
            state.isFetching = true;
            state.isError = false;
        });
        builder.addCase(fetchAllAsyncThunk.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
        });
        builder.addCase(fetchAllAsyncThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            entityAdapter.removeAll(state.entityState);
            entityAdapter.setAll(state.entityState, payload);
        });
    },
})

export const {
    name,
    reducer,
} = slice

export const actions = {
    fetchAll: fetchAllAsyncThunk,
}

type RootReducerState = {
    [sliceName]: SliceState,
};

const selectSliceState = (state: RootReducerState) => state[sliceName];
const entitySelectors = entityAdapter.getSelectors();

function createSliceSelector<T>(selector: (state: SliceState) => T) {
    return createSelector(
        selectSliceState,
        selector,
    )
}

export const selectors = {
    apiState: createSliceSelector(state => ({
        isFetching: state.isFetching,
        isError: state.isError,
    })),
    all: createSliceSelector(state => entitySelectors.selectAll(state.entityState)),
}