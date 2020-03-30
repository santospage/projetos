import { Injectable } from '@angular/core';

import { PoNotificationService } from '@portinari/portinari-ui';

import { TaskService } from 'src/app/services/task.service';

@Injectable({
  providedIn: 'root'
})

export class TaskDetailService {
  tasks: any;

  constructor(private taskService: TaskService,
              private poNotification: PoNotificationService) {
  }

  saveTask(task, altera) {
    if (task.id && task.description &&
        task.generationdate && task.deadline) {
      // Inclui/altera categoria
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
      this.poNotification.error('Código, descrição, geração e vencimento são obrigatórios!');
    }
  }

  excluiTask(task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
    this.poNotification.information(`Tarefa ${task.id} excluída com sucesso!`);
    });
  }
}
