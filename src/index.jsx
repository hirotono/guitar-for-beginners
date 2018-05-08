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
            count: false,
            stringType: type6
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
                    if(this.state.count) {
                        return <Counter playState={this.state.play} updateState={ this.updateState } />
                    } else {
                        return null
                    }
                })()}
                <Display playState={this.state.play} stringType={this.state.stringType} />
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