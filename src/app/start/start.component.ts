import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { TasksService } from './../task/shared/tasks.service';
import { StartService } from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent implements OnInit {
  faPlay = faPlay;

  constructor(private readonly tasksService: TasksService, private startService: StartService) {}

  ngOnInit() {
    this.startService.greetIfFirstStart();
  }

  start() {
    this.tasksService.navigateToRandomTask();
  }
}
