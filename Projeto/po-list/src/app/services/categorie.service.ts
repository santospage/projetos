import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  url = 'http://localhost:3000/categories'; // api rest fake

  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Obtem todos as categorias
  getCategories(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem uma categoria pelo id
  getCategorieById(id: string): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // salva uma categoria
  saveCategorie(categorie: Categorie): Observable<Categorie> {
    return this.httpClient.post<Categorie>(this.url, JSON.stringify(categorie), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // atualiza uma categoria
  updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.httpClient.put<Categorie>(`${this.url}/${categorie.id}`, JSON.stringify(categorie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // deleta uma categoria
  deleteCategorie(id: string) {
    return this.httpClient.delete<Categorie[]>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
