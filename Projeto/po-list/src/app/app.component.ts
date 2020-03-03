import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() { }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/home' },
    { label: 'Categorias', link: '/categoria' },
    { label: 'Tarefas', link: '/tarefa' },
    { label: 'Histórico', link: '/historico' },
    { label: 'Sobre', link: '/sobre' }
  ];
}
