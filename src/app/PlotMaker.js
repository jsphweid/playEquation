import {Fooplot} from './fooplot/Footplot';

export class PlotMaker {
    constructor(eq) {
        this.equation = eq;
        this.myPlot = new Fooplot(document.getElementById('myPlot'));

    }

    initializePlot() {

        // initialize globally...this.myPlot = new Fooplot(document.getElementById('myPlot'));
        this.myPlot.ymax = 1.1;
        this.myPlot.ymin = -1.1;
        this.myPlot.xmax = 0.01;
        this.myPlot.xmin = -0.01;
        this.myPlot.reDraw();
    }

    draw() {
        this.myPlot.deleteAllPlots();
        this.myPlot.addPlot(this.equation);
        this.myPlot.reDraw();
    }
}