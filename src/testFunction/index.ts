import * as actionsOnGoogle from 'actions-on-google'
const ApiAiApp = actionsOnGoogle.ApiAiApp;


export const requestHandler = function handler(req: any, res: any) {
    const WELCOME_INTENT = 'input.welcome';
    const PLAYNOTE_INTENT = 'input.playNote';
    const app = new ApiAiApp({ request: req, response: res });
    console.log(app.getRawInput());
    const actionMap = new Map();
    actionMap.set(WELCOME_INTENT, helloWorld);
    actionMap.set(PLAYNOTE_INTENT, playNote);
    app.handleRequest(actionMap);
}


function playNote(app: any) {
    let contexts = app.getContexts();
    let noteString:string =contexts[0]['parameters']['note'];
    let note:Notes = GetNoteFromString(noteString);
    let noteUrl:string = GetUrlOfNote(note);
    let ssmlMessage = "<speak>OK!<audio src='"+noteUrl+"' />I just played a "+noteString+"</speak>";
    let displayText = noteString;
    let response = GetSSMLResponse(ssmlMessage, displayText, true);
    console.log(response);
    app.tell(response);
}

enum Notes {
    C_Note,
    D_Note,
    F_Note,
    G_Note,
    A_Note,
    B_Note
}

function GetNoteFromString(noteString:string):Notes{
    console.log(noteString);
    let note:Notes = Notes.A_Note;
    switch(noteString.toLowerCase()){
        case "c":
            note = Notes.C_Note;
            console.log("do you even c?")
        break;
        default:
        throw "Unable to parse note ("+noteString+") !";
    }
    
    return note;
}


function GetUrlOfNote(note: Notes):string {
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
        default:
            throw "Note not supported (" + note + ")";

    }
    return url + part;
}

function GetSSMLResponse(ssmlMessage:string, displayText:string, expectUserResponse:boolean =false):object{
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