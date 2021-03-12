export interface ApiCreateToDoListDto {
    title:string
}

export interface ApiToDoListSummary extends ApiCreateToDoListDto {
    id: number,
}

export type ApiUpdateToDoListDto = ApiToDoListSummary;

export interface ApiToDoListDetails extends ApiUpdateToDoListDto {
    createdDate: string,
    lastModifiedDate: string | null,
}