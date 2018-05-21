import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.scss';

import Button from './components/Button.jsx';
import Display from './components/Display.jsx';
import Counter from './components/Counter.jsx';

class LayoutComponent extends Component {
    constructor(props) {
        super(props)
        const type6 = 'p-text-6';
        this.state = {
            play: false,
            preCount: false,
            playingCount: false,
            stringType: type6,
            stringTypeNum: 11,
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
                {(() => {
                    if(this.state.preCount) {
                        return <Counter speed={this.state.speed} playState={this.state.play} updateState={ this.updateState } />
                    } else {
                        return null
                    }
                })()}
                <Display speed={this.state.speed} playState={this.state.play} preCountState={this.state.preCount} playingCountState={this.state.playingCount} stringType={this.state.stringType} stringTypeNum={this.state.stringTypeNum} />
                <Button updateState={ this.updateState } playState={this.state.play} { ...btnProps } />
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