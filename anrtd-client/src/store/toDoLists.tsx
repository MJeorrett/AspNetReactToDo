import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { getPaginatedToDoLists } from '../api/todoLists';
import { Pagination } from '../models/Pagination';
import { ToDoListSummary } from '../models/ToDoList';
import { createHttpClientThunk } from './common/createHttpClientThunk';

const sliceName = 'toDoLists';

const fetchPaginatedAsyncThunk = createHttpClientThunk(
    `${sliceName}/fetchPaginated`,
    getPaginatedToDoLists,
);

const entityAdapter = createEntityAdapter<ToDoListSummary>({
    selectId: _ => _.id,
});

type SliceState = {
    entityState: EntityState<ToDoListSummary>,
    pagination: Pagination,
    isFetching: boolean,
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
    isError: false,
};

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        removeTDoList: (state, { payload }: PayloadAction<number>) => {
            entityAdapter.removeOne(state.entityState, payload);
        },
    },
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
    },
});

export const {
    name,
    reducer,
} = slice;

type RootReducerState = {
    [sliceName]: SliceState,
};

const selectSliceState = (state: RootReducerState) => state[sliceName];
const entitySelectors = entityAdapter.getSelectors();

const doPaginatedFetch = (
    dispatch: (action: unknown) => void,
    state: SliceState,
    pageNumber?: number,
    pageSize?: number) => {

    dispatch(fetchPaginatedAsyncThunk({
        pageIndex: pageNumber || state.pagination.pageNumber,
        pageSize: pageSize || state.pagination.pageSize,
    }));
};

export const actions = {
    fetchAll: () => (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state);
    },
    delete: (tDoListId: number): PayloadAction<number> => slice.actions.removeTDoList(tDoListId),
    setPageNumber: (pageNumber: number) => (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state, pageNumber);        
    },
    setPageSize: (pageSize: number) => (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state, undefined, pageSize);        
    },
};

const createSliceSelector = <T, >(selector: (state: SliceState) => T) => {
    return createSelector(
        selectSliceState,
        selector,
    );
};

export const selectors = {
    apiState: createSliceSelector(state => ({
        isFetching: state.isFetching,
        isError: state.isError,
    })),
    all: createSliceSelector(state => entitySelectors.selectAll(state.entityState)),
    pagination: createSliceSelector(state => state.pagination),
};