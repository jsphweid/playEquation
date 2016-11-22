var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var myPlot;

$(document).ready(function() {

	$("#equationInput").bind('keyup', function(event) { 
		if (event.keyCode == 13) { 
			event.preventDefault();
			doEverything(this.value);
		}
	});
});

window.onload = function() {
	initializePlot();
}

function initializePlot() {
	// initialize globally...
	myPlot = new Fooplot(document.getElementById('myPlot'));
	myPlot.ymax = 1.1;
	myPlot.ymin = -1.1;
	myPlot.xmax = 0.01;
	myPlot.xmin = -0.01;
	myPlot.reDraw();
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var eqSet = {
	clik : function(input) {
		if (!input) {
			console.log('You\'ve got to enter something!');
		} else {
			myPlot.deleteAllPlots();
			myPlot.addPlot(input, FOOPLOT_TYPE_FUNCTION);
			myPlot.reDraw();
		}
	}
};

var fixEquation = {
	// helper
	st : "",

	replaceAll : function(str, find, replace) {
  		return str.replace(new RegExp(find, 'g'), replace);
	},

	// actually fix
	fix : function(s) {
		this.st = s;
		this.st = this.replaceAll(this.st, 'FOOPLOT_MATH', 'Math');
		this.st = this.replaceAll(this.st, 'MATH', 'Math');
		this.st = this.replaceAll(this.st, 'vars.pi', 'Math.PI');
		this.st = this.replaceAll(this.st, 'vars.e', 'Math.E');
		this.st = this.replaceAll(this.st, 'vars.x', 'x');
		// this.st = this.replaceAll(this.st, 'sin', 'Math.sin');

		return this.st;
	}

};

var displayMathJax = {
	display : function(eq) {
		var $mathJaxDiv = $('#mathJaxOutput');
		$mathJaxDiv.empty();
		$mathJaxDiv.append("<p>`" + eq + "`</p>");
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,'mathJaxOutput']); // update
	}
};

var makeTone = {

	sampleRate : 44100, // times per second
	clipLength : 2, // in seconds
	mostRecentSring : "", // hacky but it works

	// 2 seconds
	makeArray : function(parsedEquation) {
		var ret = [], solveEquation;
		// make a function out of the string so we only have to eval once!
		eval('solveEquation = function(x) {' + 
				'return ' + parsedEquation + 
	 		 '};');

		for (let i = 0; i < (this.sampleRate * this.clipLength); i++) {
			ret.push(solveEquation(i / this.sampleRate));
		}
		return ret;
	},

	ADSR : function(arr) {
		var j = arr.length - 1; // last index
		for (let i = 0; i < 1000; i++) {
			var fractionOfOriginal = i / 1000;
			arr[i] *= fractionOfOriginal;
			arr[j] *= fractionOfOriginal;
			j--;
		}
		return arr;
	},

	play : function(arr) {
		var frameCount = audioCtx.sampleRate * 2.0;
		var myArrayBuffer = audioCtx.createBuffer(1, frameCount, audioCtx.sampleRate);
	    var nowBuffering = myArrayBuffer.getChannelData(0);
	    var volume = $('#volSlider').val();
	    for (var i = 0; i < frameCount; i++) {
	        nowBuffering[i] = arr[i] * volume;
	    }
	    var source = audioCtx.createBufferSource();
	    source.buffer = myArrayBuffer;
	    source.connect(audioCtx.destination);
	    source.start();
	},

	begin : function() {
		// start by getting the equation ready
		var parsedEquation = fixEquation.fix(this.mostRecentSring);
		// use the equation to generate a buffer for audio
		var arrayToPlay = this.makeArray(parsedEquation);
		// apply manual attack release...?
		var finalArray = this.ADSR(arrayToPlay);
		// use web audio api to play
		this.play(finalArray);
	}
};

function doEverything(equation) {
	// make pretty printed math with mathjax
	displayMathJax.display(equation);
	// redraw graph
	eqSet.clik(equation);
	// play tone from updated tokens above...
	makeTone.begin();
}

