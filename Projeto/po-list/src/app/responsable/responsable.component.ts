import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PoNotificationService } from '@portinari/portinari-ui';

import { ResponsableService } from './../services/responsable.service';
import { Responsable } from './../models/responsable';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
})
export class ResponsableComponent implements OnInit {
  responsableForm: FormGroup;
  responsables: Responsable[];

  columns = [
    {property: 'id', label: 'Código', align: 'left', readonly: true, width: 2, required: true },
    {property: 'name', label: 'Nome', align: 'left', readonly: true, width: 10, required: true },
  ];

  rowActions = {
    beforeInsert: this.onBeforeInsert.bind(this)
  };

  onBeforeInsert(row) {
    return false;
  }

  constructor(private responsableService: ResponsableService,
              private fb: FormBuilder,
              private poNotification: PoNotificationService) {
              this.createResponsableForm();
  }

  createResponsableForm() {
    this.responsableForm = this.fb.group({
      id: ['', Validators.compose([
        Validators.required, Validators.minLength(6), Validators.maxLength(6)
      ])],
      name: ['', Validators.compose([
        Validators.minLength(5), Validators.maxLength(30)
      ])]
    });
  }

  saveResponsable() {
    if (this.responsableForm.value.id &&
        this.responsableForm.value.name) {

      this.getResponsable();

      let altera = false;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.responsables.length; i++) {
        if (this.responsables[i].id === this.responsableForm.value.id) {
          altera = true;
          break;
        }
      }

      // Inclui/altera responsável
      if (altera) {
        this.responsableService.updateResponsable(this.responsableForm.value).subscribe(() => {
          console.log(this.responsableForm.value.name);
        });
      } else {
          this.responsableService.saveResponsable(this.responsableForm.value).subscribe(() => {
          console.log(this.responsableForm.value.name);
        });
      }
    } else {
        this.poNotification.error('Código e nome são obrigatórios!');
    }
  }

  // Chama o serviço para obtém todos os responsáveis
  getAllResponsables() {
    this.responsableService.getResponsables().subscribe((responsables: Responsable[]) => {
      this.responsables = responsables;
    });
  }

  // Chama o serviço para obter resonsável pelo id
  getResponsable() {
    this.responsableService.getResponsableById(this.responsableForm.value.id).
      subscribe((responsables: Responsable[]) => this.responsables = responsables);
  }

  // deleta um responsável
  deleteResponsable() {
    if (this.responsableForm.value.id) {
      this.responsableService.deleteResponsable(this.responsableForm.value.id).subscribe(() => {
      });
    } else {
        this.poNotification.error('Código é obrigatório');
    }
  }

  ngOnInit() {
    this.getAllResponsables();
  }
}
