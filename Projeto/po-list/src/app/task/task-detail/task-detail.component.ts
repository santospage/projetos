import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TaskService } from 'src/app/services/task.service';
import { Task } from './../../models/task';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {

  constructor(private taskService: TaskService,
              private router: Router,
              private activateRoute: ActivatedRoute
              ) {
  }

  detail: any;
  IdTask: string;
  description: string;
  responsable: string;
  categorie: string;
  generationdate: string;
  deadline: string;
  closedate: string;
  textarea: string;

  add(item) {
    this.detail = item;
  }

  alterItem(item) {
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
    this.taskService.getTaskById(item).subscribe((tasks: Task[]) => {
      this.detail = tasks;
      this.IdTask = this.detail.id;
      this.description = this.detail.description;
      this.responsable = this.detail.responsable;
      this.categorie =  this.detail.category;
      this.generationdate = `${this.taskService.AjustData(new Date(this.detail.generationdate)
        .getDate() + 1)}-${this.taskService.AjustData(new Date(this.detail.generationdate)
          .getMonth() + 1)}-${new Date(this.detail.generationdate)
            .getFullYear()}`;
      this.deadline = `${this.taskService.AjustData(new Date(this.detail.deadline)
        .getDate() + 1)}-${this.taskService.AjustData(new Date(this.detail.deadline)
          .getMonth() + 1)}-${new Date(this.detail.deadline)
            .getFullYear()}`;

      if (this.detail.closedate) {
              this.closedate =  `${this.taskService.AjustData(new Date(this.detail.closedate)
                .getDate() + 1)}-${this.taskService.AjustData(new Date(this.detail.closedate)
                .getMonth() + 1)}-${new Date(this.detail.closedate)
                .getFullYear()}`;
            }

      this.textarea = this.detail.detail;
    });
  }

  delete(item) {
    this.detail = item;
  }

  confirmTask() {
    if (this.closedate) {
      this.router.navigate(['/historic']);
    } else {
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
    this.values(this.activateRoute.snapshot.params['id']);
  }
}
