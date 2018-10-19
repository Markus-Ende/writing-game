import { Component, OnInit } from '@angular/core';
import { TasksService } from './../shared/tasks.service';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.scss']
})
export class TasksComponent {
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(private readonly tasksService: TasksService) {}

  nextTask() {
    this.tasksService.navigateToRandomTask();
  }
}
