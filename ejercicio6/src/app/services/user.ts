import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ApiResponseSingle, User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'https://peticiones.online/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  getUserById(id: string): Observable<ApiResponseSingle> {
    return this.http.get<ApiResponseSingle>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<ApiResponseSingle> {
    return this.http.post<ApiResponseSingle>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<ApiResponseSingle> { return this.http.put<ApiResponseSingle>(`${this.apiUrl}/${id}`, user) }

  deteleUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
