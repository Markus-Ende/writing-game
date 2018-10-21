import { first, switchAll, switchMap, endWith, map, mergeMap, delay, share } from 'rxjs/operators';
import { Observable, Subject, from, fromEvent, EMPTY } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private readonly speachSythesis: SpeechSynthesis | null;

  constructor(@Inject(DOCUMENT) document: Document) {
    if (document.defaultView && document.defaultView.speechSynthesis) {
      this.speachSythesis = document.defaultView.speechSynthesis;
    } else {
      this.speachSythesis = null;
      console.warn('No speech synthesis available.');
    }
  }

  public cancelCurrentSpeach() {
    this.doIfSpeachSynthesisAvailable(speachSythesis => speachSythesis.cancel(), () => {});
  }

  public say(text: string, rate = 1): void {
    this.doIfSpeachSynthesisAvailable(
      speachSythesis => {
        const utterFullWord = new SpeechSynthesisUtterance(text);
        utterFullWord.lang = 'de-DE';
        utterFullWord.rate = rate;
        speachSythesis.speak(utterFullWord);
      },
      () => {}
    );
  }

  public spell(letters: string) {
    return this.doIfSpeachSynthesisAvailable(
      speachSythesis =>
        from(letters.split('')).pipe(
          mergeMap((letter, index) => {
            const utterLetter = new SpeechSynthesisUtterance(letter);
            utterLetter.lang = 'de-DE';
            utterLetter.rate = 0.5;
            speachSythesis.speak(utterLetter);
            return fromEvent<SpeechSynthesisEvent>(utterLetter, 'start').pipe(
              first(),
              map((e: SpeechSynthesisEvent) => ({ letter: e.utterance.text, index }))
            );
          }),
          share() // we want to speak only once, regardless of the amount of subscribers
        ),
      () => EMPTY
    );
  }

  private doIfSpeachSynthesisAvailable<T>(callback: (speachSythesis: SpeechSynthesis) => T, elseCallback: () => T) {
    if (this.speachSythesis !== null) {
      return callback(this.speachSythesis);
    } else {
      return elseCallback();
    }
  }
}
