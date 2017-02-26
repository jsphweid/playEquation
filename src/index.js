import React from 'react';
import ReactDOM from 'react-dom';

import {Title} from './app/react_components/title';
import {InputArea} from './app/react_components/inputArea';
import {Graph} from './app/react_components/graph';
import {About} from './app/react_components/about';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            volume: 0.1,
            equation: ""
        };

        this.handlePlayNewEquation = this.handlePlayNewEquation.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
    }

    handlePlayNewEquation(equation) {
        console.log(equation);
        this.setState({equation: equation});
    }

    handleChangeVolume(volume) {
        this.setState({volume: volume});
    }

    render() {
        return (

            <div>
                <Title />
                <InputArea
                    handlePlayNewEquation={this.handlePlayNewEquation}
                    handleChangeVolume={this.handleChangeVolume}
                    volume={this.state.volume}
                />
                <Graph
                    equation={this.state.equation}
                />
                <About />
            </div>

        )
    }
}

ReactDOM.render(<Main/>, document.getElementById("root"));

