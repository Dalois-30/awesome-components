import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

/**
 * ici on n'injecte pas à partir du root car on doit appelle ce service uniquement
 * lorsque le module concerné est appelé , 
 * on doit le provide dans le module correspondant
 */
@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}
  
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  addNewComment(postCommented: { comment: string; postId: number; }) {
    console.log(postCommented);
    
  }
}