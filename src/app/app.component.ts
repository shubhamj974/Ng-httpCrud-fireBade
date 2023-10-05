import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'httpCrud';
  public isLoader!: boolean;
  constructor(private _loaderService: LoaderService) {}
  ngOnInit(): void {
    this._loaderService.loaderStatus.subscribe((res) => (this.isLoader = res));
  }
}
