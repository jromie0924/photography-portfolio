import { DatabaseService } from './../../services/database.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ImageModel } from 'src/app/models/image.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  public images: Array<ImageModel>;

  private unsubscribe = new Subject();

  constructor(
    private storageService: StorageService,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    this.storageService.photos.pipe(filter(value => !!value), takeUntil(this.unsubscribe)).subscribe(images => {
      this.images = images
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

}
