import { TasksService } from './../shared/tasks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  public readonly id$: Observable<Task>;

  constructor(activatedRoute: ActivatedRoute, taskService: TasksService) {
    this.id$ = activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      map(id => taskService.getTask(id))
    );
  }
}
