import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { PoTableColumn } from '@portinari/portinari-ui';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  url = 'http://localhost:3000/tasks'; // api rest fake

  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Código', width: '80px' },
      { property: 'description', label: 'Descrição', width: '150px' },
      { property: 'generationdate', label: 'Geração', type: 'date', width: '120px' },
      { property: 'category', label: 'Categoria', type: 'string', width: '110px' },
      { property: 'responsable', label: 'Responsável', type: 'string', width: '120px' },
      { property: 'deadline', label: 'Vencimento', type: 'date', width: '120px' },
      { property: 'closedate', label: 'Encerramento', type: 'date', width: '120px' },
      { property: 'status', type: 'subtitle', width: '80px', subtitles: [
        { value: 'green', color: 'color-12', label: '+ 3 dias', content: '' },
        { value: 'yellow', color: 'color-08', label: '3 dias', content: '' },
        { value: 'red', color: 'color-07', label: 'hoje', content: '' }
      ]},
    ];
  }

  // Obtem tarefas
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getSearch(search?: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url, {params: {q: search}})
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem uma tarefa pelo id
  getTaskById(id: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // atualiza uma tarefa
  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.url}/${task.id}`, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // salva uma tarefa
  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // deleta uma tarefa
  deleteTask(id: string) {
    return this.httpClient.delete<Task[]>(`${this.url}/${id}`, this.httpOptions)
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

  // Obtem status da tarefa
  getStatusTask(tasks) {
    const taskstmp: Array<any> = [];
    const dataAtual = `${new Date().getFullYear()}-${this.AjustData(new Date().getMonth() + 1)}-${this.AjustData(new Date().getDate())}`;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].closedate) {
        taskstmp.push(tasks[i]);

        if (this.ConvertData(dataAtual) >= this.ConvertData(taskstmp[taskstmp.length - 1].deadline)) {
          taskstmp[taskstmp.length - 1].status = 'red';
        } else if (this.ConvertData(taskstmp[taskstmp.length - 1].deadline) - this.ConvertData(dataAtual) < 4) {
          taskstmp[taskstmp.length - 1].status = 'yellow';
        } else {
          taskstmp[taskstmp.length - 1].status = 'green';
        }
      }
    }
    return taskstmp;
  }

  // Obtem item selecionado
  getSelectTask(item) {
    const taskstmp: Array<any> = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < item.length; i++) {
      if (item[i].$selected) {
        taskstmp.push(item[i]);
        break;
      }
    }
    return taskstmp;
  }

  // Tratamento para ajuste do tamanho da data
  AjustData(data) {
    if (data < 9) {
      data = `0${data}`;
    }

    return data;
  }

  // Tratamento para converter data em numerico
  ConvertData(data) {
    return parseFloat(data.replace(/\D/gim, ''));
  }
}
