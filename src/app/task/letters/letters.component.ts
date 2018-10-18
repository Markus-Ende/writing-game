import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent {
  public letters: string[] = '[Text Input]'.split('');
  @Input()
  set text(value: string) {
    this.letters = value.split('');
  }
}
