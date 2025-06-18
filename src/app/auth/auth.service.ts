import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIURL = "https://localhost:44375/api/Users/login";  

  constructor(private http: HttpClient) {
  }

login(request: LoginRequest): Observable<LoginResponse> {
 return this.http.post<LoginResponse>(this.APIURL, request);

}


}
