import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  private apiUrl = "https://jsonplaceholder.typicode.com/photos";

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error) => {
        console.error("Error fetching photos:", error);
        return throwError(error);
      })
    );
  }

  getPhoto(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error("Error fetching photo:", error);
        return throwError(error);
      })
    );
  }
}
