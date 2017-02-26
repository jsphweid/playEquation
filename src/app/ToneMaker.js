export class ToneMaker {

    constructor() {
        this.sampleRate = 44100;
        this.clipLength = 2;
        this.mostRecentSring = "";
        this.equation = "";
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // 2 seconds
    makeArray(parsedEquation) {
        let ret = [],
            solveEquation,
            i;
        // make a function out of the string so we only have to eval once!
        eval('solveEquation = function(x) {' +
            'return ' + parsedEquation +
            '};');

        for (i = 0; i < (this.sampleRate * this.clipLength); i++) {
            ret.push(solveEquation(i / this.sampleRate));
        }
        return ret;
    }

    ADSR(arr) {
        let j = arr.length - 1, // last index
            i;
        for (i = 0; i < 1000; i++) {
            let fractionOfOriginal = i / 1000;
            arr[i] *= fractionOfOriginal;
            arr[j] *= fractionOfOriginal;
            j--;
        }
        return arr;
    }

    playSound(arr) {
        let frameCount = this.audioCtx.sampleRate * 2.0;
        let myArrayBuffer = this.audioCtx.createBuffer(1, frameCount, this.audioCtx.sampleRate);
        let nowBuffering = myArrayBuffer.getChannelData(0);
        let volume = $('#volSlider').val();
        for (let i = 0; i < frameCount; i++) {
            nowBuffering[i] = arr[i] * volume;
        }
        let source = this.audioCtx.createBufferSource();
        source.buffer = myArrayBuffer;
        source.connect(this.audioCtx.destination);
        source.start();
    }

    begin() {
        // start by getting the equation ready
        let parsedEquation = this.fix(this.mostRecentSring);
        // use the equation to generate a buffer for audio
        let arrayToPlay = this.makeArray(parsedEquation);
        // apply manual attack release...?
        let finalArray = this.ADSR(arrayToPlay);
        // use web audio api to playSound
        this.playSound(finalArray);
    }

    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }


    fix(s) {
        let st : "";
        this.st = s;
        this.st = this.replaceAll(this.st, 'FOOPLOT_MATH', 'Math');
        this.st = this.replaceAll(this.st, 'MATH', 'Math');
        this.st = this.replaceAll(this.st, 'vars.pi', 'Math.PI');
        this.st = this.replaceAll(this.st, 'vars.e', 'Math.E');
        this.st = this.replaceAll(this.st, 'vars.x', 'x');
        return this.st;
    }

    play() {
        // playSound tone from updated tokens above...
        this.begin();
    }
}