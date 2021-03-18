import { StorageService } from './services/storage.service';
import { Component, OnInit } from '@angular/core';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'photography-portfolio';
  value = 44;

  backgroundPhoto: string;

  bodyStyle: BehaviorSubject<any>;

  private unsubscribe = new Subject();

  constructor(
    private storageService: StorageService
  ) {
    this.bodyStyle = new BehaviorSubject<any>(null);
  }

  ngOnInit() {
    this.storageService.backgroundPhoto.pipe(filter(url => !!url), takeUntil(this.unsubscribe)).subscribe(url => {
      this.backgroundPhoto = url; // TODO: add constant string value to check for no url
      const style = {
        "background-color": "rgb(74, 74, 74)",
        "background-image": `url(${url})`,
        "background-size": "cover"
      };
      this.bodyStyle.next(style);
    });
  }
}
