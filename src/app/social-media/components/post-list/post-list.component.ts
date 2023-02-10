import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {

    // get all post from resolvers
    this.posts$ = this.route.data.pipe(
      // use map to format the posts data
      map(data => data['posts'])
    )
  }

  onPostCommented(postCommented: { comment: string; postId: number; }) {
    this.postsService.addNewComment(postCommented)
  }

}
