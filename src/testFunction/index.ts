import * as actionsOnGoogle from 'actions-on-google' 
const ApiAiApp = actionsOnGoogle.ApiAiApp;


export const requestHandler = function handler(req:any, res:any){
    const WELCOME_INTENT = 'input.welcome';
    const PLAYNOTE_INTENT= 'input.playNote';
    const app = new ApiAiApp({ request: req, response: res });
    console.log(app.getRawInput());    
    const actionMap = new Map();
    actionMap.set(WELCOME_INTENT, helloWorld);
    actionMap.set(PLAYNOTE_INTENT, playNote);
    app.handleRequest(actionMap);
}


function playNote(app:any){
    let contexts = app.getContexts();
    app.tell("I play note: " + contexts[0]['parameters']['note'] + "!");
}


export const helloWorld = function helloWorld(app:any) {
    var msg = "<speak><audio src='https://storage.googleapis.com/notebot-53768.appspot.com/SampleAudio_0.5mb.mp3' />thing</speak>"

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