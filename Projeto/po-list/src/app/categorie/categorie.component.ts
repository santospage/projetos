import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PoNotificationService } from '@portinari/portinari-ui';

import { CategorieService } from './../services/categorie.service';
import { Categorie } from './../models/categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html'
})

export class CategorieComponent implements OnInit {
  categorieForm: FormGroup;
  categories: Categorie[];

  columns = [
    {property: 'id', label: 'Código', align: 'left', readonly: true, width: 2, required: true },
    {property: 'description', label: 'Descrição', align: 'left', readonly: true, width: 10, required: true },
  ];

  rowActions = {
    beforeInsert: this.onBeforeInsert.bind(this)
  };

  onBeforeInsert(row) {
    return false;
  }

  constructor(private categorieService: CategorieService,
              private fb: FormBuilder,
              private poNotification: PoNotificationService) {
              this.createCategorieForm();
  }

  createCategorieForm() {
    this.categorieForm = this.fb.group({
      id: ['', Validators.compose([
        Validators.required, Validators.minLength(6), Validators.maxLength(6)
      ])],
      description: ['', Validators.compose([
        Validators.minLength(5), Validators.maxLength(30)
      ])]
    });
  }

  saveCategorie() {
    if (this.categorieForm.value.id &&
        this.categorieForm.value.description) {

      this.getCategorie();

      let altera = false;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].id === this.categorieForm.value.id) {
          altera = true;
          break;
        }
      }

      // Inclui/altera categoria
      if (altera) {
        this.categorieService.updateCategorie(this.categorieForm.value).subscribe(() => {
          console.log(this.categorieForm.value.description);
        });
      } else {
          this.categorieService.saveCategorie(this.categorieForm.value).subscribe(() => {
          console.log(this.categorieForm.value.description);
        });
      }
    } else {
        this.poNotification.error('Código e descrição são obrigatórios!');
    }
  }

  // Chama o serviço para obtém todos as categorias
  getAllCategories() {
    this.categorieService.getCategories().subscribe((categories: Categorie[]) => {
      this.categories = categories;
    });
  }

  // Chama o serviço para obter categoria pelo id
  getCategorie() {
    this.categorieService.getCategorieById(this.categorieForm.value.id).
      subscribe((categories: Categorie[]) => this.categories = categories);
  }

  // deleta uma categoria
  deleteCategorie() {
    if (this.categorieForm.value.id) {
      this.categorieService.deleteCategorie(this.categorieForm.value.id).subscribe(() => {
      });
    } else {
        this.poNotification.error('Código é obrigatório');
    }
  }

  ngOnInit() {
    this.getAllCategories();
  }
}
