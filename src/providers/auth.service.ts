import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../models/user.interface';

// interface User {
//     uid: string;
//     email: string;
//     photoURL?: string;
//     displayName?: string;
//     favoriteColor?: string;
// }

@Injectable()
export class AuthService {

    user: Observable<User>;

    constructor( 
        private navCtrl: NavController,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        ) {
            this.user = this.afAuth.authState
            .switchMap(user => {
            if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
            } else {
                return Observable.of(null);
            }
        })
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
            this.updateUserData(credential.user)
        })
    }

    private updateUserData(user) {
        // Sets user data to firestore on login

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        }
        return userRef.set(data, { merge: true })
    }

    getAuthenticateduser() {
        return this.afAuth.authState;
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
        // this.navCtrl.setRoot('LoginPage');
        })
    }
}
