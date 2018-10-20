import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
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
  @HostBinding('class')
  colorClass = '';

  constructor(private readonly tasksService: TasksService) {
    this.allTasksDone$ = tasksService.allRandomTasksDone$;
    this.setRandomBackgroundColor();
  }

  nextTask() {
    this.tasksService.navigateToRandomTask();
    this.setRandomBackgroundColor();
  }

  private setRandomBackgroundColor() {
    const colorClasses = ['tasks--red', 'tasks--green', 'tasks--yellow', 'tasks--blue', 'tasks--orange', 'tasks--pink'];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    this.colorClass = colorClasses[randomIndex];
  }

  restart() {
    this.tasksService.restart();
  }
}
