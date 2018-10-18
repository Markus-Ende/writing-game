import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const tasks: Task[] = [
  {
    id: 'unicorn',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Einhorn-Grafik.svg',
    letters: 'EINHORN'
  },
  {
    id: 'christmas-tree',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Color_this_christmas_tree.svg',
    letters: 'WEIHNACHTSBAUM'
  },
  {
    id: 'pig',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Emojione_BW_1F416.svg',
    letters: 'SCHWEIN'
  }
];

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private readonly router: Router) {}

  getTask(id: string): Task {
    if (id === 'initial') {
      return {
        id: 'initial',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Emojione_BW_1F917.svg',
        letters: ''
      };
    }
    return tasks.find(task => task.id === id);
  }

  navigateToTask(id: string) {
    this.router.navigate(['tasks', id]);
  }

  navigateToRandomTask() {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    this.navigateToTask(randomTask.id);
  }
}
