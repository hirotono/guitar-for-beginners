import React, { Component } from 'react';
import { render } from 'react-dom';

import './application.scss';

import Button from './components/Button.jsx';
import Display from './components/Display.jsx';
import Counter from './components/Counter.jsx';

class LayoutComponent extends Component {
    constructor(props) {
        super(props)
        const stringType6Array = ['6', '5', '4', '3', '2', '1'];
        const stringType7Array = ['7', '6', '5', '4', '3', '2', '1'];
        this.state = {
            play: false,
            preCount: false,
            playingCount: false,
            stringName: '6',// TODO: updateStateしていく
            stringTypeArray: stringType6Array,
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
                    <Display className="notes-display" speed={this.state.speed} playState={this.state.play} preCountState={this.state.preCount} playingCountState={this.state.playingCount} stringName={this.state.stringName} stringTypeNum={this.state.stringTypeArray.length * 2} />
                    {(() => {
                        if (this.state.preCount) {
                            return <Counter speed={this.state.speed} playState={this.state.play} updateState={this.updateState} />
                        } else {
                            return null
                        }
                    })()}
                </div>
                <Button updateState={this.updateState} playState={this.state.play} {...btnProps} />
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