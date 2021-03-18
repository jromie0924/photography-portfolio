import { ImageModel } from './../../models/image.model';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  public images: Observable<Array<ImageModel>>;

  private _images: BehaviorSubject<Array<ImageModel>>;
  private unsubscribe = new Subject();

  constructor(
    private storageService: StorageService
  ) {
    this._images = new BehaviorSubject<Array<ImageModel>>(null);
    this.images = this._images.asObservable();
  }

  ngOnInit() {
    this.storageService.photos.pipe(filter(value => !!value), takeUntil(this.unsubscribe)).subscribe(images => {
      this._images.next(images)
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

}
