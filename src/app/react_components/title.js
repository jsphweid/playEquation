import React from 'react';

export class Title extends React.Component {

    constructor() {
        super();
        this.state = {
            "titleDiv" : {
                "textAlign" : "center"
            }
        };
    }

    render() {
        return (
            <div style={this.state.titleDiv} className="container">
                <h1>playEquation</h1>
                <span>... and graph it too!</span>
            </div>
        );
    }
}