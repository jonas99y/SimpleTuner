import * as actionsOnGoogle from 'actions-on-google';
import * as admin from 'firebase-admin';
import * as secret from './secret'
// import * as cert from "https://storage.cloud.google.com/notebot-53768.appspot.com/capso-789ce-firebase-adminsdk-9l8bo-3c3f55c7f8.json"

const ApiAiApp = actionsOnGoogle.ApiAiApp;
let dbApp: admin.app.App;

export const requestHandler = function handler(req: any, res: any) {
    const WELCOME_INTENT = 'input.welcome';
    const PLAYNOTE_INTENT = 'input.playNote';
    const app = new ApiAiApp({ request: req, response: res });
    console.log(app.getRawInput());
    const actionMap = new Map();
    actionMap.set(WELCOME_INTENT, helloWorld);
    actionMap.set(PLAYNOTE_INTENT, playNote);
    GetDbApp().then(firebaseApp => {
        app.handleRequest(actionMap);
    })

}


function GetDbApp(): Promise<admin.app.App> {
    const promise: Promise<admin.app.App> = new Promise((resolve, reject) => {
        if (dbApp == undefined)
            dbApp = admin.initializeApp({
                credential: admin.credential.cert(secret.key),
                databaseURL: "https://capso-789ce.firebaseio.com"
            });
        resolve(dbApp);

    });
    return promise;

}


function playNote(app: any) {
    let contexts = app.getContexts();
    let noteString: string = contexts[0]['parameters']['note'];
    console.log(app.getUser().userId);
    let note: Notes = GetNoteFromString(noteString);
    let noteUrl: string = GetUrlOfNote(note);
    let ssmlMessage = "<speak>OK!<audio src='" + noteUrl + "' />I just played a " + noteString + "</speak>";
    let displayText = noteString;
    let response = GetSSMLResponse(ssmlMessage, displayText, true);
    console.log(response);
    addNoteToDb(note).then(x => {
        app.tell(response);
    });
}

function addNoteToDb(note: Notes): Promise<void> {
    const promise: Promise<void> = new Promise((resolve, reject) => {
        GetDbApp().then(dbApp => {

            dbApp.database().ref("/notes/" + note).transaction(x => {
                return x + 1;
            }).then(x => {
                resolve();
            });
        });
    });
    return promise;
}


enum Notes {
    C_Note = "C",
    D_Note = "D",
    F_Note = "F",
    G_Note = "G",
    A_Note = "A",
    B_Note = "B"
}

function GetNoteFromString(noteString: string): Notes {
    let note: Notes = Notes.A_Note;
    switch (noteString.toUpperCase()) {
        case "C":
            note = Notes.C_Note;
            break;
        case "D":
            note = Notes.D_Note;
            break;
        default:
            throw "Unable to parse note (" + noteString + ") !";
    }

    return note;
}


function GetUrlOfNote(note: Notes): string {
    const url: string = "https://storage.googleapis.com/notebot-53768.appspot.com/sounds/"
    let part: string;
    switch (note) {
        case (Notes.A_Note):
            part = "68437__pinkyfinger__piano-a.wav"
            break;
        case (Notes.B_Note):
            part = "68438__pinkyfinger__piano-b.wav"
            break;
        case (Notes.C_Note):
            part = "68440__pinkyfinger__piano-c.wav"
            break;
        case (Notes.D_Note):
            part = "68442__pinkyfinger__piano-d.wav"
            break;
        default:
            throw "Note not supported (" + note + ")";

    }
    return url + part;
}

function GetSSMLResponse(ssmlMessage: string, displayText: string, expectUserResponse: boolean = false): object {
    var response = {
        "speech": ssmlMessage,
        data: {
            google: {
                "expect_user_response": expectUserResponse,
                "is_ssml": true
            }
        },
        "source": "my webhook",
        "displayText": displayText
    }
    return response;
}

export const helloWorld = function helloWorld(app: any) {
    var msg = "<speak><audio src='https://storage.googleapis.com/notebot-53768.appspot.com/sounds/68437__pinkyfinger__piano-a.wav />thing</speak>"

    var response = {
        "speech": msg,
        data: {
            google: {
                "expect_user_response": true,
                "is_ssml": true
            }
        },
        "source": "my webhook",
        "displayText": "Am I display"
    }
    app.tell(response);

};