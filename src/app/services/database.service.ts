import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ImageModel } from '../models/image.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DatabaseService {


    public imageData: Observable<Array<ImageModel>>

    private _imageData: BehaviorSubject<Array<ImageModel>>;

    constructor(
        private fireDb: AngularFireDatabase,
        private authService: AuthService
    ) {
        this._imageData = new BehaviorSubject<Array<ImageModel>>(null);
        this.imageData = this._imageData.asObservable();

        if (!this.authService.authState) {
            this.authService.anonymousLogin().then(() => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }

    private setup() {
        this.fireDb.database.refFromURL(environment.databaseUrl).get().then(data => {
            const imageDataList = new Array<ImageModel>();
            const dataJson = data.toJSON();
            for (const property in dataJson) {
                const categories = new Array<string>();
                for (const category in dataJson[property].categories) {
                    categories.push(dataJson[property].categories[category]);
                }
                imageDataList.push(<ImageModel>{
                    categories: categories,
                    filename: dataJson[property].filename,
                    title: dataJson[property].title
                });
            }
            this._imageData.next(imageDataList);
        });
    }
}