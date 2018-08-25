export interface PagingInfo {
    pageSize: number;
    pageIndex: number;
    count: number;
}


export interface SortExpression {
    sortField: string;
    assending: boolean;
}

export interface ModelState {
    message: string;
    modelState: { [key: string]: string[] };
}

export interface RecordIdDto {
    id: number
}

export class baseFilter {
    page?: number = 1;
    objectsPerPage?: number = 4;
    sortFieldDirections?: string = 'id';
    sortFieldNames?: string = 'desc';
}
