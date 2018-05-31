import React, { Component } from 'react';
import { render } from 'react-dom';

import './scss/application.scss';

import Button from './components/Button.jsx';
import Display from './components/Display.jsx';
import Counter from './components/Counter.jsx';

class LayoutComponent extends Component {
    constructor(props) {
        super(props)
        const stringType6Array = ['6', '5', '4', '3', '2', '1'];
        const stringType7Array = ['7', '6', '5', '4', '3', '2', '1'];
        const stringTypeArray = stringType6Array;
        this.state = {
            isPlay: false,
            isPreCount: false,
            isPlayingCount: false,
            stringName: stringTypeArray.length,
            stringTypeArray: stringTypeArray,
            stringTypeNum: this.state,
            speed: 1000,
        }
        this.updateState = this.updateState.bind(this)
    }
    updateState(state) {
        this.setState(state)
    }
    render() {
        return(
            <div>
                <div className="layout-view">
                    <Display className="notes-display" speed={this.state.speed} playState={this.state.isPlay} preCountState={this.state.isPreCount} playingCountState={this.state.isPlayingCount} stringName={this.state.stringName} stringTypeArray={this.state.stringTypeArray} />
                    {(() => {
                        if (this.state.isPreCount) {
                            return <Counter speed={this.state.speed} playState={this.state.isPlay} updateState={this.updateState} />
                        } else {
                            return null
                        }
                    })()}
                </div>
                <Button updateState={this.updateState} playState={this.state.isPlay} {...btnProps} />
            </div>
        )
    }
}

const btnProps = {
    buttonTextPlay: 'p-btn-play',
    buttonTextStop: 'p-btn-stop',
}

render(
    <LayoutComponent />, document.getElementById('app'));