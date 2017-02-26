import React from 'react';
import {PlotMaker} from '../PlotMaker'

export class Graph extends React.Component {

    constructor() {
        super();

    }

    render() {
        let eq = this.props.equation;
        eq ? new PlotMaker(eq).draw() : undefined;


        return (
            <div className="container space">
                <div className="row">
                    <div id="myPlot"></div>
                </div>
            </div>
        )

    }

}