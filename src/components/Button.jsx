import React, { Component } from 'react';

export default class Button extends Component {
    play() {
        this.props.updateState({
            isPlay: true,
            isPreCount: true
        })
    }
    stop() {
        this.props.updateState({
            isPlay: false,
            isPreCount: false,
            isPlayingCount: false,
        })
    }
    render() {
        const btnTextClass  = this.props.playState ? this.props.buttonTextStop : this.props.buttonTextPlay ;
        const playStateText = this.props.playState ? '再生中' : '停止中';
        return (
            <div className={ `${btnTextClass} btn-view` } onClick = { () => {
                if (this.props.playState) {
                    this.stop()
                } else {
                    this.play()
                }
            } }>{playStateText}</div>
        );
    }
}