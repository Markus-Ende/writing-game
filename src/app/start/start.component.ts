import { TasksService } from './../task/shared/tasks.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  faPlay = faPlay;

  constructor(private readonly tasksService: TasksService) {}
  start() {
    this.tasksService.navigateToRandomTask();
  }
}
