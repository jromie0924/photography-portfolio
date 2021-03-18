import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

    public authUser: Observable<any>;
    public authState: Observable<any>;

    private _authUser: BehaviorSubject<any>;
    private _authState: BehaviorSubject<any>;

    constructor(
        private auth: AngularFireAuth
    ) {
        this._authState = new BehaviorSubject<any>(null);
        this._authUser = new BehaviorSubject<any>(null);

        this.authState = this._authState.asObservable();
        this.authUser = this._authUser.asObservable();


        this.auth.authState.subscribe(auth => {
            this._authUser.next(auth)
        });
    }

    anonymousLogin(): Promise<any> {
        return this.auth.signInAnonymously()
            .then(state => {
                this._authUser.next(state)
            })
            .catch(error => console.error(error));
    }
}