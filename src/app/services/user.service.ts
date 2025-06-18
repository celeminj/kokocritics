import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly APIURL = "https://localhost:44375/api/Users";  
  readonly APIURLREGISTER = "https://localhost:44375/api/Users/register";
 
  constructor(private http: HttpClient) {
  }

    getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.APIURL);
    }

    findById(id: number): Observable<User> {
      return this.http.get<User>(`${this.APIURL}/${id}`);
    }

     findByName(name : string): Observable<User> {
      return this.http.get<User>(`${this.APIURL}/${name}`);
    }

    createUsuario(request: User): Observable<User> {
      return this.http.post<User>(this.APIURL, request);
    }
  
    updateUsuario(id: number, request: User) {
    return this.http.put<User>(`${this.APIURL}/${id}`, request);
    }
   
    deleteUsers(id: number): Observable<void> {
    return this.http.delete<void>(`${this.APIURL}/${id}`);
    }
    
        register(formData: FormData): Observable<User> {
    return this.http.post<User>(this.APIURLREGISTER, formData);
  }


}
