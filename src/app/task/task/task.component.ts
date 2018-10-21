import { LettersState } from './../shared/lettersState';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, map, filter, switchMap, combineLatest, tap, startWith } from 'rxjs/operators';
import { TasksService } from './../shared/tasks.service';

function isDefined<T>(a: T | null): a is T {
  return a !== null && a !== undefined;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  public readonly task$: Observable<Task>;
  public readonly letters$$ = new Subject<LettersState>();

  constructor(activatedRoute: ActivatedRoute, private readonly taskService: TasksService) {
    this.task$ = activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      map(id => taskService.getTask(id || '')),
      filter(isDefined)
    );

    this.task$
      .pipe(
        switchMap(task =>
          this.taskService.say(task).pipe(startWith({ word: task.letters, currentlySpokenLetter: '', currentlySpokenLetterIndex: -1 }))
        )
      )
      .subscribe(this.publishLetters);
  }

  speak() {
    this.task$
      .pipe(
        first(),

        switchMap(task => this.taskService.say(task)),
        startWith({ word: '', currentlySpokenLetter: '', currentlySpokenLetterIndex: -1 })
      )
      .subscribe(this.publishLetters);
  }

  private publishLetters = (lettersState: LettersState) => {
    this.letters$$.next(lettersState);
  };
}
