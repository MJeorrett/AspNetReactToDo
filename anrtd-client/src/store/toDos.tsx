import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { getPaginatedToDos } from '../api/todos';
import { ToDoStatus } from '../config/ToDoStatus';
import { Pagination } from '../models/Pagination';
import { ToDoSummary } from '../models/ToDo';
import { createHttpClientThunk } from './common/createHttpClientThunk';

const sliceName = 'toDos';

const fetchPaginatedAsyncThunk = createHttpClientThunk(
    `${sliceName}/fetchPaginated`,
    getPaginatedToDos,
);

const entityAdapter = createEntityAdapter<ToDoSummary>({
    selectId: toDo => toDo.id,
});

type SliceState = {
    entityState: EntityState<ToDoSummary>,
    pagination: Pagination,
    selectedStatuses: ToDoStatus[], 
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
    selectedStatuses: [],
    isFetching: false,
    isError: false,
};

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        removeToDo: (state, { payload }: PayloadAction<number>) => {
            entityAdapter.removeOne(state.entityState, payload);
        },
        toggleSelectedStatus: (state, { payload }: PayloadAction<ToDoStatus>) => {
            state.selectedStatuses.includes(payload) ?
                state.selectedStatuses = state.selectedStatuses.filter(status => status !== payload) :
                state.selectedStatuses.push(payload);
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
        toDoStatuses: state.selectedStatuses,
        pageIndex: pageNumber || state.pagination.pageNumber,
        pageSize: pageSize || state.pagination.pageSize,
    }));
};

export const actions = {
    fetchAll: () => (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state);
    },
    delete: (toDoId: number): PayloadAction<number> => slice.actions.removeToDo(toDoId),
    setPageNumber: (pageNumber: number) => (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state, pageNumber);        
    },
    setPageSize: (pageSize: number) => (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state, undefined, pageSize);        
    },
    toggleSelectedStatus: (status: ToDoStatus) =>  (dispatch: (action: unknown) => void, getState: () => RootReducerState): void => {
        dispatch(slice.actions.toggleSelectedStatus(status));
        const state = selectSliceState(getState());
        doPaginatedFetch(dispatch, state);
    }
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
    selectedStatuses: createSliceSelector(state => state.selectedStatuses),
};