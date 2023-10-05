import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipost } from '../../model/post';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public postForm!: FormGroup;
  public numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public editMode: boolean = false;
  public postId!: string;
  constructor(
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.createPostForm();
    this.editPost();
  }

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
    });
  }

  onPostForm() {
    if (this.postForm.valid) {
      this._postService.addPost(this.postForm.value).subscribe((res) => {
        this._router.navigate(['/']);
        this._snackBar.openSnackBar('New Post is Successfully Added');
      });
      this.postForm.reset();
    }
  }

  editPost() {
    this._route.params.subscribe((params: Params) => {
      this.postId = params['postId'];
      this.postId
        ? ((this.editMode = true),
          this._postService
            .getSinglePost(this.postId)
            .subscribe((res: Ipost) => {
              this.postForm.patchValue(res);
            }))
        : (this.editMode = false);
    });
  }

  onUpdatePost() {
    let obj = {
      ...this.postForm.value,
      id: this.postId,
    };
    this._postService.updatePost(obj).subscribe((res: Ipost) => {
      this._router.navigate(['/']);
      this._snackBar.openSnackBar('Post is Sucessfully Updated');
    });
  }
}
