export interface ApiPagination {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export interface ApiPaginatedResponse<T> extends ApiPagination {
    items: T[],
}
