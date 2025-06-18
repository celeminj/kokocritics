import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import Videogame from '../models/Videogame';

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {

  readonly APIURL = "https://localhost:44375/api/Videogames";  
 
  constructor(private http: HttpClient) {
  }

    getAllVideoGames(): Observable<Videogame[]> {
        return this.http.get<Videogame[]>(this.APIURL);
    }
    getVideoGameById(id: number): Observable<Videogame> {
        return this.http.get<Videogame>(`${this.APIURL}/${id}`);
    }
      getByTitle(title: string): Observable<Videogame> {
  return this.http.get<Videogame>(`${this.APIURL}/by-title?title=${encodeURIComponent(title)}`);
}

    addVideoGame(videogame: Videogame): Observable<Videogame> {
        return this.http.post<Videogame>(this.APIURL, videogame);
    }
    updateVideoGame(id: number, videogame: Videogame): Observable<Videogame> {
        return this.http.put<Videogame>(`${this.APIURL}/${id}`, videogame);
    }
    deleteVideoGame(id: number): Observable<void> {
        return this.http.delete<void>(`${this.APIURL}/${id}`);
    }
    searchVideoGames(query: string): Observable<Videogame[]> {
        return this.http.get<Videogame[]>(`${this.APIURL}/search?query=${query}`);
    }
    getVideoGamesByGenre(genre: string): Observable<Videogame[]> {
        return this.http.get<Videogame[]>(`${this.APIURL}/genre/${genre}`);
    }


}
