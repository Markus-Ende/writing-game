import { SpeechService } from './../shared/speech.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  private isFirstStart = true;

  constructor(private readonly speech: SpeechService) {}

  greetIfFirstStart() {
    if (this.isFirstStart) {
      this.speech.say('Hallo Hannah! Wenn du anfangen möchtest, drücke auf den lila Knopf.');
      this.isFirstStart = false;
    }
  }
}
