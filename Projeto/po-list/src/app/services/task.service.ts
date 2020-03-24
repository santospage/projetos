import { Injectable } from '@angular/core';

import { PoTableColumn } from '@portinari/portinari-ui';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Código', width: '80px' },
      { property: 'description', label: 'Descrição', width: '150px' },
      { property: 'generationdate', label: 'Geração', type: 'date', width: '120px' },
      { property: 'category', label: 'Categoria', type: 'string', width: '100px' },
      { property: 'responsable', label: 'Responsável', type: 'string', width: '120px' },
      { property: 'deadline', label: 'Vencimento', type: 'date', width: '120px' },
      { property: 'closedate', label: 'Encerramento', type: 'date', width: '120px' },
      { property: 'status', type: 'subtitle', width: '80px', subtitles: [
        { value: 'verde', color: 'color-12', label: '+ 3 dias', content: '' },
        { value: 'amarelo', color: 'color-08', label: '3 dias', content: '' },
        { value: 'vermelho', color: 'color-07', label: 'hoje', content: '' }
      ]},
    ];
  }

  getItems() {
    return [{
      id: '000001', description: 'Tarefa 01', generationdate: '2020-03-20', category: 'Análise', responsable: 'Responsável 01',
      deadline: '2020-03-30', closedate: '', status: 'verde' }];
  }

  constructor() {}
}
