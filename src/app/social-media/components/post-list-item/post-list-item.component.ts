import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {
  
  @Input() post!: Post;
  // create a new emitevent object and send it to the parent component
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();
  
  onNewComment(comment: string) {
    // emit the postcommented event from the value of the comment get to the child component
    this.postCommented.emit({ comment: comment, postId: this.post.id });
  }
}
