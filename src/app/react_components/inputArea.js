import React from 'react';

export class InputArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "inputAreaDiv": {
                "textAlign" : "center",
                "margin" : "20px"
            },
            "aLittleMargin" : {
                "margin": "5px"
            },
            "input": {
                "width": "300px",
                "textAlign": "center",
                "margin": "0 auto"
            },
            inputText: "",
        };

        this.SAMPLE_1 = "sin(2 * pi * x * 440)";
        this.SAMPLE_2 = "sin(2 * pi * x * 440) + sin(2 * pi * x * 1000) + sin(2 * pi * x * 3959)";

        this.handlePlayNewEquation = this.handlePlayNewEquation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSample1 = this.handleSample1.bind(this);
        this.handleSample2 = this.handleSample2.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
    }

    handlePlayNewEquation() { this.props.handlePlayNewEquation(this.state.inputText); }
    handleSample1() {
        this.props.handlePlayNewEquation(this.SAMPLE_1);
        this.setState({inputText: this.SAMPLE_1});
    }
    handleSample2() {
        this.props.handlePlayNewEquation(this.SAMPLE_2);
        this.setState({inputText: this.SAMPLE_2});
    }
    handleInputChange(event) { this.setState({inputText: event.target.value}); }
    handleChangeVolume(event) {
        this.props.handleChangeVolume(parseFloat(event.target.value));
    }

    render() {
        return (
            <div style={this.state.inputAreaDiv}>
                <div className="row rowInputArea">
                    <span style={this.state.aLittleMargin}>Enter equation here and press PLAY!</span>
                    <button onClick={this.handleSample1} className="btn btn-default btn-lg round">Example 1</button>
                    <button onClick={this.handleSample2} className="btn btn-default btn-lg round">Example 2</button>
                </div>
                <div className="row rowInputArea form-group">
                    <input style={this.state.input} className="form-control" value={this.state.inputText} onChange={this.handleInputChange} type="text" />
                    <div className="row rowInputArea">
                        <button onClick={this.handlePlayNewEquation} className="btn btn-default btn-lg round">Play!</button>
                    </div>
                    <span className="spanCenter">Volume: <input id="volSlider" type="range" min="0" max="1" step="0.1" defaultValue={this.props.volume} onChange={this.handleChangeVolume} /></span>
                </div>
            </div>
        )
    }

}