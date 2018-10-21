import { LettersState } from './lettersState';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpeechService } from './../../shared/speech.service';
import { tasks } from './tasks';
import { tap, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public readonly allRandomTasksDone$: Observable<boolean>;
  private randomTasks: Task[] = [];
  private isFirstTask = true;

  constructor(private readonly router: Router, private readonly speech: SpeechService) {
    this.allRandomTasksDone$ = new BehaviorSubject(false);
    this.resetRandomTasks();
  }

  private get allRandomTasksDone$$() {
    return this.allRandomTasksDone$ as BehaviorSubject<boolean>;
  }

  private resetRandomTasks() {
    this.randomTasks = tasks.slice(0);
    if (this.allRandomTasksDone$$.value === true) {
      this.allRandomTasksDone$$.next(false);
    }
  }

  public restart() {
    this.resetRandomTasks();
    this.speech.cancelCurrentSpeach();
    this.speech.say('Super! Du hast alles fertig gemacht! Willst du nochmal von vorne anfangen?');
    this.router.navigate(['/']);
  }

  getTask(id: string): Task | null {
    const foundTask = tasks.find(task => task && task.id === id);
    return foundTask || null;
  }

  private navigateToTask(id: string) {
    this.router.navigate(['tasks', id]);
  }

  navigateToRandomTask() {
    if (!this.randomTasks || this.randomTasks.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.randomTasks.length);
    const randomTask = this.randomTasks.splice(randomIndex, 1)[0];
    this.navigateToTask(randomTask.id);

    if (this.randomTasks.length === 0) {
      this.allRandomTasksDone$$.next(true);
    }
  }

  say(task: Task): Observable<LettersState> {
    this.speech.cancelCurrentSpeach();
    // use lower case to avoid saying things like "upper-case A" on some browsers
    const spelling$ = this.speech.spell(task.letters.toLowerCase());
    spelling$.pipe(delay(1000)).subscribe(
      () => {},
      () => {},
      () => {
        this.speech.say(task.letters, 0.8);
        if (this.isFirstTask) {
          this.speech.say(
            'Wenn du es nochmal hören willst, drücke auf das Bild. Wenn du das nächste Wort sehen willst, drücke auf die weißen Pfeile.'
          );
          this.isFirstTask = false;
        }
      }
    );
    return spelling$.pipe(
      map(letterInfo => ({
        word: task.letters,
        currentlySpokenLetter: letterInfo.letter.toUpperCase(),
        currentlySpokenLetterIndex: letterInfo.index
      }))
    );
  }
}
