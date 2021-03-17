import { DatabaseService } from './database.service';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { filter, take } from 'rxjs/operators';
import { ListResult } from '@angular/fire/storage/interfaces';

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
            this.afStorage.refFromURL(`${environment.imageUrl}/${environment.imageDirectory}`).listAll().subscribe(async obj => {
                this.photos.next(await this.getImageUrls(obj, values));
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