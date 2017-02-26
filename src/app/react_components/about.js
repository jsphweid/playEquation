import React from 'react';

export class About extends React.Component {

    constructor() {
        super();

        this.state = {
            "aboutDiv": {
                "textAlign": "center"
            }
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={this.state.aboutDiv}>
                    <h1>How it works</h1>

                    <h4>Explanation</h4>
                    <p>Basically, it takes your equation, renders it on the screen, and creates a short sound sample of how the equation sounds.</p>

                    <h4>Slightly more Explanation</h4>
                    <p>I use <a href="http://fooplot.com/">fooplot</a> (<a href="https://github.com/dheera/fooplot">GitHub</a>), an open-source home-made graphing utility to plot the graph. It also parses the equation and filters out a lot of possible bogus answers.</p>

                    <p>Next, a 2-second plain ole Array filled with sampled data is created manually by plugging in numbers for the 2-second range. This array of length 88200 is rendered by HTML5's Audio Context.</p>
                </div>
            </div>

        )
    }

}