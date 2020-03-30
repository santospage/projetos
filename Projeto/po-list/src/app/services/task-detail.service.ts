import { Injectable } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';

@Injectable({
  providedIn: 'root'
})

export class TaskDetailService {
  poNotification: any;

  constructor(private taskService: TaskService) {
  }

  saveTask(task) {
    if (task.id && task.description && task.generationdate) {
      // Inclui/altera categoria
      let altera = false;

      if (altera) {
        this.taskService.updateTask(task).subscribe(() => {
          console.log(task.description);
        });
      } else {
          this.taskService.saveTask(task).subscribe(() => {
          console.log(task.description);
        });
      }
    } else {
      alert('Código, descrição e data de geração são obrigatórios!');
    }
  }
}
