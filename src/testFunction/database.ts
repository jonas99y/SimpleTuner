import * as admin from 'firebase-admin';
import { User } from './model';
export class Database {

    private userNode: string = "users/";

    private dbApp: admin.app.App;
    private database: admin.database.Database;
    constructor(key: object) {
        this.dbApp = admin.initializeApp({
            credential: admin.credential.cert(key), //ignore error
            databaseURL: "https://capso-789ce.firebaseio.com"
        });
        this.database = this.dbApp.database();
    }

    public getUser(userId: string): Promise<User> {
        const promise = new Promise<User>((resolve, reject) => {
            this.database.ref(this.userNode + userId).once('value').then(user => {
                if (user == undefined) {
                    user = new User(userId);
                    this.database.ref(this.userNode + userId).set(user);
                }
                resolve(user);
            }).catch(reject);
        });

        return promise;
    }



    public updateUser(user: User): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            this.dbApp.database().ref(this.userNode + user.id).update(user).then(resolve).catch(reject);
        });

        return promise;
    }

    // public get currentUser(): User {

    // }

    // private CurrentUser(app: any): Promise<User> {
    //     const promise = new Promise<User>((resolve, reject) => {
    //         if (currentUser == undefined) {
    //             getUserFromDb(app.getUser().userId).then(user => {
    //                 currentUser = user;

    //             }).catch(err => {
    //                 currentUser = new User(app.getUser().userId);
    //             });

    //         }
    //         resolve(currentUser);
    //     });
    //     return promise;
    // }



}