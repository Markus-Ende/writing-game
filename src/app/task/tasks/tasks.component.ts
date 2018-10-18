import { Component, OnInit } from '@angular/core';
import { TasksService } from './../shared/tasks.service';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.scss']
})
export class TasksComponent {
  constructor(private readonly tasksService: TasksService) {}

  nextTask() {
    this.tasksService.navigateToRandomTask();
  }
}
