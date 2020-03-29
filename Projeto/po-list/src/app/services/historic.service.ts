import { Injectable } from '@angular/core';
import { PoTableColumn } from '@portinari/portinari-ui';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  constructor() {}

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Código', width: '80px' },
      { property: 'description', label: 'Descrição', width: '150px' },
      { property: 'generationdate', label: 'Geração', type: 'date', width: '120px' },
      { property: 'category', label: 'Categoria', type: 'string', width: '110px' },
      { property: 'responsable', label: 'Responsável', type: 'string', width: '120px' },
      { property: 'deadline', label: 'Vencimento', type: 'date', width: '120px' },
      { property: 'closedate', label: 'Encerramento', type: 'date', width: '120px' },
    ];
  }

  // Obtem status do historico
  getStatusHistoric(historics) {
    const historictmp: Array<any> = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < historics.length; i++) {
      if (historics[i].closedate) {
        historictmp.push(historics[i]);
      }
    }
    return historictmp;
  }
}
