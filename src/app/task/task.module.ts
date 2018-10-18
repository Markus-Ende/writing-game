import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LettersComponent } from './letters/letters.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  imports: [CommonModule, TaskRoutingModule],
  declarations: [TaskComponent, TasksComponent, LettersComponent]
})
export class TaskModule {}
