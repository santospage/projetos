import { Component, OnInit, ViewChild } from '@angular/core';

import {
  PoDialogService,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoNotificationService,
  PoPageFilter
} from '@portinari/portinari-ui';

import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  actions: Array<PoTableAction> = [
    { action: this.details.bind(this), icon: 'po-icon-ok', label: 'Incluir' },
    { action: this.details.bind(this), icon: 'po-icon-change', label: 'Alterar' },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Visualizar' },
    { action: this.details.bind(this), icon: 'po-icon-delete', label: 'Excluir' }
  ];
  columns: Array<PoTableColumn> = this.taskService.getColumns();
  detail: any;
  items: Array<any> = this.taskService.getItems();

  public readonly filterSettings: PoPageFilter = {
    action: 'filterAction',
    advancedAction: 'advancedFilterActionModal',
    ngModel: 'labelFilter',
    placeholder: 'Search'
  };

  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(private taskService: TaskService,
              private poNotification: PoNotificationService,
              private poDialog: PoDialogService) {}

  details(item) {
    this.detail = item;
  }

  private getDescription(item: any) {
    return `Airfare to ${item.destination} - ${item.initials}`;
  }

  ngOnInit() {
  }
}
