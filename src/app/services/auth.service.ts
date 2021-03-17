import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {

    public authState: any;

    constructor(
        private auth: AngularFireAuth
    ) {
        this.auth.authState.subscribe(auth => {
            this.authState = auth;
        });
    }

    anonymousLogin(): Promise<any> {
        return this.auth.signInAnonymously()
            .then(user => {
                this.authState = user;
            })
            .catch(error => console.error(error));
    }
}