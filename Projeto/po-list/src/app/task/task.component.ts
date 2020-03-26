import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  PoDialogService,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoNotificationService
} from '@portinari/portinari-ui';

import { TaskService } from './../services/task.service';
import { Task } from './../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;
  tasks: Task[];
  columns: Array<PoTableColumn> = this.taskService.getColumns();
  detail: any;
  actions: Array<PoTableAction> = [
    { action: this.details.bind(this), icon: 'po-icon-ok', label: 'Incluir' },
    { action: this.details.bind(this), icon: 'po-icon-change', label: 'Alterar' },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Visualizar' },
    { action: this.details.bind(this), icon: 'po-icon-delete', label: 'Excluir' }
  ];

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(private taskService: TaskService,
              private fb: FormBuilder,
              private poNotification: PoNotificationService,
              private poDialog: PoDialogService,
              ) {
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

  details(item) {
    this.detail = item;
  }

  hasTask(tasks) {
    return this.taskService.getStatusTask(tasks);
  }

   ngOnInit() {
    this.getAllTasks();
  }
}

