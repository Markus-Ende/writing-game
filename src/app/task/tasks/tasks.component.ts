import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { TasksService } from './../shared/tasks.service';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  readonly faAngleDoubleRight = faAngleDoubleRight;
  readonly allTasksDone$: Observable<boolean>;

  constructor(private readonly tasksService: TasksService) {
    this.allTasksDone$ = tasksService.allRandomTasksDone$;
  }

  nextTask() {
    this.tasksService.navigateToRandomTask();
  }

  restart() {
    this.tasksService.restart();
  }
}
