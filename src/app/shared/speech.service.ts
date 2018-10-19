import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private readonly speachSythesis?: SpeechSynthesis;

  constructor(@Inject(DOCUMENT) document: Document) {
    if (document.defaultView && document.defaultView.speechSynthesis) {
      this.speachSythesis = document.defaultView.speechSynthesis;
    } else {
      console.warn('No speech synthesis available.');
    }
  }

  public say(text: string) {
    if (this.speachSythesis) {
      const utterFullWord = new SpeechSynthesisUtterance(text);
      utterFullWord.lang = 'de-DE';
      utterFullWord.rate = 0.8;
      this.speachSythesis.speak(utterFullWord);

      text.split('').forEach(letter => {
        const utterLetter = new SpeechSynthesisUtterance(letter);
        utterLetter.lang = 'de-DE';
        utterLetter.rate = 0.5;
        this.speachSythesis.speak(utterLetter);
      });
    }
  }
}