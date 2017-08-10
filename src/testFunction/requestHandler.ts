import { Database } from './database';
import { Note, User } from './model';

export class RequestHandler {
    private contexts: Array<any>;
    private parameters: any;
    private currentUser: User;
    constructor(private app: any, private database: Database) {
        this.contexts = app.getContexts();
        console.log(this.contexts[0]);
        this.parameters = this.contexts[0]['parameters'];
        this.database.getUser(app.getUser().userId).then(user => {
            this.currentUser = user;
            this.handle(this.app.getIntent());            
        });

    }

    private handle(intentName: string) {
        switch (intentName) {
            case "input.playNote":
                this.handlePlayNote();
                break;
            default:
                // do default stuff here
                break;
        }
    }

    private handlePlayNote() {

        let noteString: string = this.parameters['note'];
        let note: Note = new Note(noteString);

        this.playNote(note, this.currentUser);

    }


    private playNote(note: Note, user: User) {
        let ssmlMessage = "<speak>OK!<audio src='" + note.Url + "' />I just played a " + note.Name + "</speak>";
        let displayText = note.Name;
        let response = this.getSSMLResponse(ssmlMessage, displayText, true);

        this.respondToUser(response);

        // addNoteToUser(note, user).then(x => {
        //     resolve(response);

        // });

    }

    private handleRepeat(app: any) {


    }

    private respondToUser(response: string | object) {
        this.database.updateUser(this.currentUser);
        this.app.tell(response);
    }

    // private getNoteFromString(noteString: string): Note {
    //     let note: Notes = Notes.A_Note;
    //     switch (noteString.toUpperCase()) {
    //         case "C":
    //             note = Notes.C_Note;
    //             break;
    //         case "D":
    //             note = Notes.D_Note;
    //             break;
    //         default:
    //             throw "Unable to parse note (" + noteString + ") !";
    //     }

    //     return note;

    // }



    private getSSMLResponse(ssmlMessage: string, displayText: string, expectUserResponse: boolean = false): object {
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



}