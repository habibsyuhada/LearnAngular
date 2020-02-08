import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
<<<<<<< HEAD
import { catchError, retry } from 'rxjs/operators';
import { Student } from './models/student';
=======
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
>>>>>>> parent of ddd3518... ganti tutor

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/products';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error); // log to console instead
      return of(result as any);
    };
  }

  getProducts(): Observable<any> {
    return this.http.get(apiUrl)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getProduct(id: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError(`getProduct id=${id}`))
    );
  }
  
  addProduct(product: Product): Observable<any> {
    return this.http.post(apiUrl, product, httpOptions).pipe(
      tap((prod: Product) => console.log(`added product w/ id=${prod._id}`)),
      catchError(this.handleError('addProduct'))
    );
  }
  
  updateProduct(id: any, product: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError('updateProduct'))
    );
  }
  
  deleteProduct(id: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError('deleteProduct'))
    );
  }
  
  
}
