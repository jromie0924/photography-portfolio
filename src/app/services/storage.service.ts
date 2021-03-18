import { DatabaseService } from './database.service';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { filter, take } from 'rxjs/operators';
import { ListResult } from '@angular/fire/storage/interfaces';
import { Constants } from '../constants/constants';

@Injectable()
export class StorageService {

    public photos: Observable<Array<ImageModel>>;
    public backgroundPhoto: Observable<string>;

    private _photos: BehaviorSubject<Array<ImageModel>>;
    private _backgroundPhoto: BehaviorSubject<string>;

    constructor(
        private afStorage: AngularFireStorage,
        private authService: AuthService,
        private databaseService: DatabaseService
    ) {
        this._photos = new BehaviorSubject<Array<ImageModel>>(null);
        this.photos = this._photos.asObservable();
        this._backgroundPhoto = new BehaviorSubject<string>(null);
        this.backgroundPhoto = this._backgroundPhoto.asObservable();

        this.authService.authUser.pipe(take(1)).subscribe(val => {
            if (val) {
                this.setup();
            } else {
                this.authService.anonymousLogin().then(() => this.setup()).catch(err => console.error(err));
            }
        });
    }

    private setup() {
        this.afStorage.refFromURL(`${environment.imageUrl}/${environment.backgroundDirectory}`).listAll().pipe(take(1)).subscribe(image => {
            if (image.items.length) {
                image.items[0].getDownloadURL()
                    .then(url => this._backgroundPhoto.next(url))
                    .catch(() => this._backgroundPhoto.next(Constants.noUrl()));
            } else {
                this._backgroundPhoto.next(Constants.noUrl());
            }
        });

        this.databaseService.imageData.pipe(filter(values => !!values), take(1)).subscribe(values => {
            this.afStorage.refFromURL(`${environment.imageUrl}/${environment.imageDirectory}`).listAll().subscribe(async obj => {
                this._photos.next(await this.getImageUrls(obj, values));
            })
        });
    }

    private async getImageUrls(listResult: ListResult, values: ImageModel[]): Promise<Array<ImageModel>> {
        return await new Promise<Array<ImageModel>>(resolve => {
            const rejects = new Array<any>();
            listResult.items.forEach(async item => {
                await new Promise<void>(res => {
                    item.getDownloadURL().then(url => {
                        values.find(val => val.filename === item.name).source = url;
                        res();
                    }).catch(reason => {
                        rejects.push(reason);
                        res();
                    });
                });
            });

            if (rejects.length) {
                console.error(`One or more errors occurred while obtaining the image URLs: ${rejects}`)
            }
            resolve(values);
        })
    }
}