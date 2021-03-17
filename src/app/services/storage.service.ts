import { DatabaseService } from './database.service';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class StorageService {

    public photos: BehaviorSubject<Array<ImageModel>>;

    constructor(
        private afStorage: AngularFireStorage,
        private authService: AuthService,
        private databaseService: DatabaseService
    ) {
        this.photos = new BehaviorSubject<Array<ImageModel>>(null);
        if (this.authService.authState) {
            this.setup();
        } else {
            this.authService.anonymousLogin().then(() => {
                this.setup();
            });
        }
    }

    private setup() {
        this.databaseService.imageData.pipe(filter(values => !!values), take(1)).subscribe(values => {
            this.afStorage.refFromURL(`${environment.imageUrl}/${environment.imageDirectory}`).listAll().subscribe(obj => {

                // Progress tracker subject used as a waiting method for the promises to finish.
                const progressTracker = new Subject<number>();
                progressTracker.next(-1);
                let counter = 0;
                progressTracker.pipe(filter(val => val >= 0), take(obj.items.length)).subscribe(() => {
                    if (++counter == obj.items.length) {
                        this.photos.next(values);
                        console.log(values);
                    }
                });

                obj.items.forEach((item, idx) => {
                    item.getDownloadURL().then(url => {
                        values.find(val => val.filename === item.name).source = url;
                        progressTracker.next(idx);
                    });
                });
            })
        });
    }
}