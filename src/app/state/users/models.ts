import { RecordIdDto, baseFilter } from "../state-models";

export interface UserDto extends RecordIdDto {
    name?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    job?: string;
    updatedAt?: string
}

export interface UserListDto extends RecordIdDto {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserDto[];
}

export interface UserFilterDto extends baseFilter {

}