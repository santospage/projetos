import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  PoDialogService,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoNotificationService
} from '@portinari/portinari-ui';

import { TaskService } from './../services/task.service';
import { Task } from './../models/task';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;
  tasks: Task[];
  columns: Array<PoTableColumn> = this.taskService.getColumns();
  actions: Array<PoTableAction> = [];

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(private taskService: TaskService,
              private fb: FormBuilder,
              private poNotification: PoNotificationService,
              private poDialog: PoDialogService,
              private taskDetailComponent: TaskDetailComponent,
              private router: Router) {
                this.createTaskForm();
  }

  createTaskForm() {
    this.taskForm = this.fb.group({
      id: ['', Validators.compose([
        Validators.required, Validators.minLength(6), Validators.maxLength(6)
      ])],
      description: ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(30)
      ])],
      generationdate: ['', Validators.compose([
        Validators.minLength(10)])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      responsable: ['', Validators.compose([
        Validators.required
      ])],
      deadline: ['', Validators.compose([
        Validators.required, Validators.minLength(10)
      ])],
      closedate: ['', Validators.compose([
        Validators.minLength(10)
      ])],
      status: ['', Validators.compose([
        Validators.maxLength(10)
      ])],
      detail: ['', Validators.compose([
        Validators.maxLength(100)
      ])]
    });
  }

  // Chama o serviço para obtém todos as tarefas
  getAllTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = this.hasTask(tasks);
    });
  }

  hasTask(tasks) {
    return this.taskService.getStatusTask(tasks);
  }

  // Adicionar
  add() {
     this.taskDetailComponent.addItem();
  }

  // Alterar
  alter(item) {
    let taskstmp: Array<any> = [];
    taskstmp = this.taskService.getSelectTask(item);
    this.taskDetailComponent.alterItem(taskstmp);
  }

  // Excluir
  delete(item) {
    let taskstmp: Array<any> = [];
    taskstmp = this.taskService.getSelectTask(item);
    this.taskDetailComponent.deleteItem(taskstmp);
  }

  // Visualizar
  view(item) {
    let taskstmp: Array<any> = [];
    taskstmp = this.taskService.getSelectTask(item);
    this.taskDetailComponent.viewItem(taskstmp);
  }

   ngOnInit() {
    this.getAllTasks();
  }
}

