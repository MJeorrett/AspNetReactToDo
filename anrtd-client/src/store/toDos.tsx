import { createEntityAdapter, createSelector, createSlice, EntityState } from '@reduxjs/toolkit';
import { deleteToDo, getAllToDos } from '../api/todos';
import { ToDoSummary } from '../models/ToDo';
import { createHttpClientThunk } from './common/createHttpClientThunk';

const sliceName = 'toDos';

const fetchAllAsyncThunk = createHttpClientThunk(
    `${sliceName}/fetchAll`,
    getAllToDos,
);

const deleteAsyncThunk = createHttpClientThunk(
    `${sliceName}/delete`,
    deleteToDo,
)

const entityAdapter = createEntityAdapter<ToDoSummary>({
    selectId: toDo => toDo.id,
});

type SliceState = {
    entityState: EntityState<ToDoSummary>,
    isFetching: boolean,
    isDeletingById: {
        [key: number]: boolean,
    },
    isError: boolean,
}

const initialState: SliceState = {
    entityState: entityAdapter.getInitialState(),
    isFetching: false,
    isDeletingById: {},
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
        builder.addCase(deleteAsyncThunk.pending, (state, action) => {
            const toDoId = action.meta.arg;
            state.isDeletingById[toDoId] = true;
        });
        builder.addCase(deleteAsyncThunk.rejected, (state, action) => {
            const toDoId = action.meta.arg;
            state.isDeletingById[toDoId] = false;
        });
        builder.addCase(deleteAsyncThunk.fulfilled, (state, action) => {
            const toDoId = action.meta.arg;
            state.isDeletingById[toDoId] = false;
            entityAdapter.removeOne(state.entityState, action.meta.arg)
        });
    },
})

export const {
    name,
    reducer,
} = slice

export const actions = {
    fetchAll: fetchAllAsyncThunk,
    delete: (toDoId: number) => deleteAsyncThunk(toDoId),
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
    isDeletingById: createSliceSelector(state => state.isDeletingById),
}