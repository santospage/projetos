import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html'
})

export class CategorieComponent implements OnInit {
  rowActions = {
    beforeSave: this.onBeforeSave.bind(this),
    afterSave: this.onAfterSave.bind(this),
    beforeRemove: this.onBeforeRemove.bind(this),
    afterRemove: this.onAfterRemove.bind(this),
    beforeInsert: this.onBeforeInsert.bind(this)
  };

  columns = [
    {property: 'id', label: 'Código', align: 'left', readonly: true, width: 1, required: true},
    {property: 'description', label: 'Descrição', align: 'left', width: 10, required: true},
    {property: 'actions', label: 'Ações', align: 'left', readonly: true, action: true, width: 5},
  ];

  data = [
    {id: '000001', description: 'Análise', status: 'Active', actions: 'Excluir'},
    {id: '000002', description: 'Desenvolvimento', status: 'Active', actions: 'Excluir'},
    {id: '000003', description: 'Teste Unitário', status: 'Active', actions: 'Excluir'},
    {id: '000004', description: 'Teste Integrado', status: 'Active', actions: 'Excluir'}
  ];

  constructor() {}

  ngOnInit() {}

  onBeforeSave(row: any, old: any) {
    return row.occupation !== 'Engineer';
  }

  onAfterSave(row) {
    // console.log('onAfterSave(new): ', row);
  }

  onBeforeRemove(row) {
    // console.log('onBeforeRemove: ', row);
    return true;
  }

  onAfterRemove(row) {
    // console.log('onAfterRemove: ', row);
  }

  onBeforeInsert(row) {
    // console.log('onBeforeInsert: ', row);
    return true;
  }
}
