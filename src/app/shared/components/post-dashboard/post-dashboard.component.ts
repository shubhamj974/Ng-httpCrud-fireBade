import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Ipost } from '../../model/post';
import { DialogBoxService } from '../../service/dialog-box.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss'],
})
export class PostDashboardComponent implements OnInit {
  public postArr!: Array<Ipost>;
  constructor(
    private _postService: PostService,
    private _dialogBox: DialogBoxService,
    private _snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.allPost();
  }

  allPost() {
    this._postService.getAllPost().subscribe((res: Array<Ipost>) => {
      this.postArr = res;
      this._snackBar.openSnackBar('Post Api is Sucessfully Completed');
    });
  }

  onRemove(postId: string): void {
    this._dialogBox
      .openDialog('1000ms', '0ms', DialogBoxComponent)
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._postService.removePost(postId).subscribe((data) => {
            document.getElementById(postId)?.remove();
            this._snackBar.openSnackBar('Post is Sucessfully remove');
          });
        } else {
          return;
        }
      });
  }
}
