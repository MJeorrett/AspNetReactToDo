import { createEntityAdapter, createSelector, createSlice, Dispatch, EntityState } from '@reduxjs/toolkit';
import { deleteToDo, getPaginatedToDos } from '../api/todos';
import { Pagination } from '../models/Pagination';
import { ToDoSummary } from '../models/ToDo';
import { createHttpClientThunk } from './common/createHttpClientThunk';

const sliceName = 'toDos';

const fetchPaginatedAsyncThunk = createHttpClientThunk(
    `${sliceName}/fetchPaginated`,
    getPaginatedToDos,
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
    pagination: Pagination,
    isFetching: boolean,
    isDeletingById: {
        [key: number]: boolean,
    },
    isError: boolean,
}

const initialState: SliceState = {
    entityState: entityAdapter.getInitialState(),
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
        totalPages: 1,
    },
    isFetching: false,
    isDeletingById: {},
    isError: false,
}

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPaginatedAsyncThunk.pending, state => {
            state.isFetching = true;
            state.isError = false;
        });
        builder.addCase(fetchPaginatedAsyncThunk.rejected, state => {
            state.isFetching = false;
            state.isError = true;
        });
        builder.addCase(fetchPaginatedAsyncThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            entityAdapter.removeAll(state.entityState);
            entityAdapter.setAll(state.entityState, payload.items);
            state.pagination = {
                ...payload,
            };
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

type RootReducerState = {
    [sliceName]: SliceState,
};

const selectSliceState = (state: RootReducerState) => state[sliceName];
const entitySelectors = entityAdapter.getSelectors();

const doPaginatedFetch = (
    dispatch: (action: any) => void,
    state: SliceState,
    pageNumber?: number,
    pageSize?: number) => {

    dispatch(fetchPaginatedAsyncThunk({
        pageIndex: pageNumber || state.pagination.pageNumber,
        pageSize: pageSize || state.pagination.pageSize,
    }));
}

export const actions = {
    fetchAll: () => (dispatch: (action: any) => void, getState: () => RootReducerState) => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state);
    },
    delete: (toDoId: number) => deleteAsyncThunk(toDoId),
    setPageNumber: (pageNumber: number) => (dispatch: (action: any) => void, getState: () => RootReducerState) => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state, pageNumber);        
    },
    setPageSize: (pageSize: number) => (dispatch: (action: any) => void, getState: () => RootReducerState) => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state, undefined, pageSize);        
    },
}

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
    pagination: createSliceSelector(state => state.pagination),
}