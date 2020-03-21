import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})

export class ResponsableService {
  url = 'http://localhost:3000/responsables'; // api rest fake

  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Obtem responsáveis
  getResponsables(): Observable<Responsable[]> {
    return this.httpClient.get<Responsable[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem um responsável pelo id
  getResponsableById(id: string): Observable<Responsable[]> {
    return this.httpClient.get<Responsable[]>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // salva um responsável
  saveResponsable(responsable: Responsable): Observable<Responsable> {
    return this.httpClient.post<Responsable>(this.url, JSON.stringify(responsable), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // atualiza um responsável
  updateResponsable(responsable: Responsable): Observable<Responsable> {
    return this.httpClient.put<Responsable>(`${this.url}/${responsable.id}`, JSON.stringify(responsable), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // deleta um responsável
  deleteResponsable(id: string) {
    return this.httpClient.delete<Responsable[]>(`${this.url}/${id}`, this.httpOptions)
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
