import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TaskService } from 'src/app/services/task.service';
import { Task } from './../../models/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskDetailService } from 'src/app/services/task-detail.service';
import { TaskComponent } from './../task.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {

  detail: any;
  IdTask: Task;
  description: Task;
  responsable: Task;
  categorie: Task;
  generationdate: Task;
  deadline: Task;
  closedate: Task;
  textarea: Task;
  status: Task;
  inputDisabled: boolean;
  formulariosForm: FormGroup;
  tasks: any;

  constructor(private taskService: TaskService,
              private taskDetailService: TaskDetailService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private taskComponent: TaskComponent,
              private fb: FormBuilder
              ) {
                this.createTaskForm();
  }

  createTaskForm() {
    this.values(this.activateRoute.snapshot.params['id']);
    this.taskComponent.createTaskForm();
  }

  // Adicionar
  addItem() {
    this.router.navigate([`/task/Incluir`]);
  }

  // Alterar
  alterItem(item) {
    this.detail = item;
  }

  // Excluir
  deleteItem(item) {
    this.detail = item;
  }

  // Visualizar
  viewItem(item) {
    this.taskService.getTaskById(item[0].id).subscribe((tasks: Task[]) => {
      this.detail = tasks;
      this.router.navigate([`/task/${this.detail.id}`]);
    });
  }

  values(item) {
    if (item !== undefined) {
      this.taskService.getTaskById(item).subscribe((tasks: Task[]) => {
      this.detail = tasks;
      this.IdTask = this.detail.id;
      this.description = this.detail.description;
      this.responsable = this.detail.responsable;
      this.categorie =  this.detail.category;
      this.generationdate = this.detail.generationdate;
      this.deadline = this.detail.deadline;

      if (this.detail.closedate) {
              this.closedate = this.detail.closedate;
              this.inputDisabled = true;
      }

      this.textarea = this.detail.detail;
      });
    }
  }

  delete(item) {
    this.detail = item;
  }

  confirmTask() {
    if (this.closedate) {
      this.router.navigate(['/historic']);
    } else {
        this.taskComponent.taskForm.value.id = this.IdTask;
        this.taskComponent.taskForm.value.description = this.description;
        this.taskComponent.taskForm.value.generationdate = this.generationdate;
        this.taskComponent.taskForm.value.category = this.categorie;
        this.taskComponent.taskForm.value.responsable =  this.responsable;
        this.taskComponent.taskForm.value.deadline = this.deadline;
        this.taskComponent.taskForm.value.closedate = this.closedate;
        this.taskComponent.taskForm.value.status = this.status;
        this.taskComponent.taskForm.value.detail = this.textarea;

        this.taskDetailService.saveTask(this.taskComponent.taskForm.value);
        this.router.navigate(['/task']);
    }
  }

  cancelTask() {
    if (this.closedate) {
      this.router.navigate(['/historic']);
    } else {
      this.router.navigate(['/task']);
    }
  }

  ngOnInit() {
  }
}
