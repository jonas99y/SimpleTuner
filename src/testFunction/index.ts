import * as actionsOnGoogle from 'actions-on-google';
import * as secret from './secret'
import { RequestHandler } from './requestHandler';
import { Database } from './database';
import { User } from './model';

const ApiAiApp = actionsOnGoogle.ApiAiApp;
// let dbApp: admin.app.App;
// let currentUser: User;

export const requestHandler = function handler(req: any, res: any) {
    // const WELCOME_INTENT = 'input.welcome';
    // const PLAYNOTE_INTENT = 'input.playNote';
    // const REPEAT_INTENT = 'input.repeat'
    const app = new ApiAiApp({ request: req, response: res });
    // console.log(app.getRawInput());
    new RequestHandler(app, new Database(secret.key));
    // const actionMap = new Map();
    // actionMap.set(PLAYNOTE_INTENT, playNoteHandler);
    // actionMap.set(REPEAT_INTENT, repeatHandler);
    // DbApp().then(firebaseApp => {
    //     app.handleRequest(actionMap);
    // });

}














// function addNoteToUser(note: Notes, user: User): Promise<void> {
//     const promise: Promise<void> = new Promise((resolve, reject) => {
//         DbApp().then(dbApp => {
//             dbApp.database().ref(userNode + user.id + "/history").push(note).then(resolve).catch(reject);
//         });
//     });
//     return promise;

// }

// function addNoteToDb(note: Notes): Promise<void> {
//     const promise: Promise<void> = new Promise((resolve, reject) => {
//         DbApp().then(dbApp => {

//             dbApp.database().ref("/notes/" + note).transaction(x => {
//                 return x + 1;
//             }).then(x => {
//                 resolve();
//             });
//         });
//     });
//     return promise;
// }






// function DbApp(): Promise<admin.app.App> {
//     const promise: Promise<admin.app.App> = new Promise((resolve, reject) => {
//         if (dbApp == undefined)
//             dbApp = admin.initializeApp({
//                 credential: admin.credential.cert(secret.key), //ignore error
//                 databaseURL: "https://capso-789ce.firebaseio.com"
//             });
//         resolve(dbApp);

//     });
//     return promise;

// }
