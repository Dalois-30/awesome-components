import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  // get the comments list form the parent component 
  @Input() comments!: Comment[];

  // sent the comment to the parent component
  // eventEmitter creates a new eventEmitter 
  @Output() newComment = new EventEmitter<string>()

  // use just FormControl to simplify the creation of the comment
  commentCtrl!: FormControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
        return;
    }
    // emit the event
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
}


}
