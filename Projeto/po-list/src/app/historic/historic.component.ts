import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HistoricService } from './../services/historic.service';
import { Task } from '../models/task';
import { PoTableColumn, PoTableAction } from '@portinari/portinari-ui';
import { TaskComponent } from './../task/task.component';
import { TaskService } from '../services/task.service';
import { TaskDetailComponent } from '../task/task-detail/task-detail.component';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html'
})
export class HistoricComponent implements OnInit {

  historicForm: FormGroup;
  historics: Task[];
  columns: Array<PoTableColumn> = this.historicService.getColumns();
  actions: Array<PoTableAction> = [];

  constructor(private historicService: HistoricService,
              private taskService: TaskService,
              private taskDetailComponent: TaskDetailComponent,
              private taskComponent: TaskComponent) {
              this.taskComponent.createTaskForm();
  }

  // Chama o serviço para obtém todos os históricos
  getAllHistorics() {
    this.taskService.getTasks().subscribe((historics: Task[]) => {
      this.historics = this.hasHistoric(historics);
    });
  }

  hasHistoric(historics) {
    return this.historicService.getStatusHistoric(historics);
  }

  // Visualizar
  view(item) {
    let historictmp: Array<any> = [];
    historictmp = this.taskService.getSelectTask(item);
    this.taskDetailComponent.viewItem(historictmp);
  }

  ngOnInit() {
    this.getAllHistorics();
  }
}
