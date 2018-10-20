import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TasksService } from './../shared/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  public readonly id$: Observable<Task>;

  constructor(activatedRoute: ActivatedRoute, private readonly taskService: TasksService) {
    this.id$ = activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      map(id => taskService.getTask(id))
    );
  }

  speak() {
    this.id$.pipe(first()).subscribe(task => this.taskService.say(task));
  }
}
