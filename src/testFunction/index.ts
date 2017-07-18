/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

//const ApiAiApp = require('actions-on-google').ApiAiApp;

export const helloWorld = function helloWorld(req:any, res:any) {
    //const app = new ApiAiApp({request: req, response: res});
    console.log("new call")
    console.log(req);
    console.log("processing...")

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

    console.log(response);
    res.status(200).send(response);

};