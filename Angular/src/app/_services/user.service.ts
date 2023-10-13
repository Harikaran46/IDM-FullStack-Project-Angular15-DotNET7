import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    create(User: User){

      return this.http.post<User>(`${environment.apiUrl}/users`,User);
    }

    edit(user: User): Observable<User> {
      return this.http.put<User>(`${environment.apiUrl}/users/`, user);
    }

    delete(id :number){
      return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
    }

}
