import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LettersState } from '../shared/lettersState';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LettersComponent {
  public letters: { letter: string; visible: boolean }[] = [];

  @Input()
  set text(value: LettersState | null) {
    if (value !== null && value.word.length > 0) {
      const letters = value.word.split('');
      this.letters = letters.map((letter, index) => ({ letter, visible: index <= value.currentlySpokenLetterIndex }));
    }
  }
}
