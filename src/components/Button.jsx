import React, { Component } from 'react';

export default class Button extends Component {
    play() {
        this.props.updateState({
            play: true,
            count: true
        })
    }
    stop() {
        this.props.updateState({
            play: false,
            count: false
        })
    }
    render() {
        const btnTextClass  = this.props.playState ? this.props.buttonTextStop : this.props.buttonTextPlay ;
        const playStateText = this.props.playState ? '再生中' : '停止中';
        return (
            <div className= { btnTextClass } onClick = { () => {
                if (this.props.playState) {
                    this.stop()
                } else {
                    this.play()
                }
            } }>{playStateText}</div>
        );
    }
}