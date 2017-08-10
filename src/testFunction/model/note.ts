export class Note {
    private readonly allowedPitches: Array<string> = ["C", "D", "E", "F", "G", "H", "A", "B"];
    private pitch: string;

    constructor(pitch: string) {
        if (this.allowedPitches.indexOf(pitch.toUpperCase())>-1){
            this.pitch = pitch;
        }
    }

    public get Url(): string {

        const url: string = "https://storage.googleapis.com/notebot-53768.appspot.com/sounds/"
        let part: string;
        switch (this.pitch) {
            case ("A"):
                part = "68437__pinkyfinger__piano-a.wav"
                break;
            case ("B"):
                part = "68438__pinkyfinger__piano-b.wav"
                break;
            case ("C"):
                part = "68440__pinkyfinger__piano-c.wav"
                break;
            case ("D"):
                part = "68442__pinkyfinger__piano-d.wav"
                break;
            default:
                throw "Note not supported (" + this.pitch + ")";
        }
        return url + part;
    }

    public get Name():string{
        return this.pitch;
    }


}




