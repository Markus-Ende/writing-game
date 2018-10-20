import { SpeechService } from './../shared/speech.service';
import { TasksService } from './../task/shared/tasks.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  faPlay = faPlay;

  constructor(private readonly tasksService: TasksService, private readonly speech: SpeechService) {}

  ngOnInit() {
    this.speech.say('Hallo Hannah! Wenn du anfangen möchtest, drücke auf den lila Knopf.', 1.2);
  }

  start() {
    this.tasksService.navigateToRandomTask();
  }
}
