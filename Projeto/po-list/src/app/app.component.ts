import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {}

  readonly menus: Array<PoMenuItem> = [
    {label: 'Home', link: '/home'},
    {label: 'Categorias', link: '/categorie'},
    {label: 'Responsáveis', link: '/responsable'},
    {label: 'Tarefas', link: '/task'},
    {label: 'Histórico', link: '/historic'},
    {label: 'Sobre', link: '/about'}
  ];
}
