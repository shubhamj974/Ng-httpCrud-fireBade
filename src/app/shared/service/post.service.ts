import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Ipost } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public postUrl = `${environment.baseUrl}/posts.json`;
  constructor(private _http: HttpClient) {}

  getAllPost(): Observable<Array<Ipost>> {
    return this._http.get<any>(this.postUrl).pipe(
      map((res) => {
        let data: Array<Ipost> = [];
        for (const post in res) {
          let obj = {
            id: post,
            ...res[post],
          };
          data.push(obj);
        }
        return data;
      })
    );
  }

  addPost(obj: Ipost): Observable<any> {
    return this._http.post<any>(this.postUrl, obj);
  }

  getSinglePost(postId: string): Observable<Ipost> {
    let singlePostUrl = `${environment.baseUrl}/posts/${postId}.json`;
    return this._http.get<Ipost>(singlePostUrl);
  }

  updatePost(postObj: Ipost): Observable<Ipost> {
    let singlePostUrl = `${environment.baseUrl}/posts/${postObj.id}.json`;
    return this._http.patch<Ipost>(singlePostUrl, postObj);
  }

  removePost(postid: string): Observable<null> {
    let singlePostUrl = `${environment.baseUrl}/posts/${postid}.json`;
    return this._http.delete<any>(singlePostUrl);
  }
}
