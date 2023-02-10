import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { UsernamePipe } from './pipes/username.pipe';

@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    TimeAgoPipe,
    UsernamePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    TimeAgoPipe,
    UsernamePipe

  ]
})
export class SharedModule { }