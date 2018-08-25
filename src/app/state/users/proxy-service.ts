import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { UserListDto, UserDto } from "./models";

const baseUrl = 'https://reqres.in/api';

@Injectable()
export class UsersProxyService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        const body = { email, password };
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('content-Type', 'application/x-www-form-urlencoded');
        return this.http.request('POST', `${baseUrl}/Login`, {
            body, headers
        })

    }
    getAll(pageIndex?: number, pageSize?: number): Observable<UserListDto> {
        let search = new HttpParams();
        if (pageIndex)
            search = search.append('page', pageIndex.toString());
        if (pageSize)
            search = search.append('per_page', pageSize.toString());
        return this.http.request('get', `${baseUrl}/users`, { params: search })
            .map(res => <UserListDto>res)
    }


    add(dto: UserDto): Observable<UserDto> {
        return this.http.request('post', `${baseUrl}/users`, { body: dto }) as Observable<UserDto>;
    }

    delete(id: number): Observable<any> {
        return this.http.request('delete', `${baseUrl}/users/${id}`) as Observable<any>;
    }

    update(dto: UserDto): Observable<UserDto> {
        return this.http.request('patch', `${baseUrl}/users/${dto.id}`, { body: dto }) as Observable<UserDto>;
    }
}
