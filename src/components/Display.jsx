import React, { Component } from 'react';
import StringCell from './StringCell.jsx';
import NotesCell from './NotesCell.jsx';

// TODO: state管理リファクタ
// TODO: 速度パターンを3種類程つくって値を共通管理
// TODO: stateの初期化リファクタ
export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNotes: {
                notes: undefined,
                keySignature: null
            },
            nextNotes: {
                notes: undefined,
                keySignature: null
            },
            currentPlayingCountNum: 1
        }
    }
    stateInit() {
        console.log('stateInit')
        this.setState({
            currentNotes: {
                notes: undefined,
                keySignature: null
            },
            nextNotes: {
                notes: undefined,
                keySignature: null
            },
            currentPlayingCountNum: 1
        })
    }
    playingCountStart() {
        console.log(this.state.currentPlayingCountNum);
        this.setState({
            currentPlayingCountNum: this.state.currentPlayingCountNum + 1,
        })
        this.playingCount = setTimeout(() => {
            this.playingCountStart()
            if (this.state.currentPlayingCountNum === this.props.stringTypeNum) {
                this.setState({
                    currentPlayingCountNum: 1
                })
                this.setCurrentNotes();
            } else if (this.state.currentPlayingCountNum === (this.props.stringTypeNum - 4)) {
                this.setNextNotes(this.randomNotes())
            }
        }, this.props.speed);
    }
    randomNotes() {
        // TODO: 同じnotesが続いたら振り直し
        const notesArray = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        const randomNotesIndex = this.random(notesArray.length);
        let keySignatureArray = ['sharp', 'flat', null];

        if (-1 < [0, 3].indexOf(randomNotesIndex)) {
            keySignatureArray = ['sharp', null];
        } else if (-1 < [2, 6].indexOf(randomNotesIndex)) {
            keySignatureArray = ['flat', null];
        }
        const randomKeySignatureIndex = this.random(keySignatureArray.length)

        return {
            notes: notesArray[randomNotesIndex],
            keySignature: keySignatureArray[randomKeySignatureIndex]
        }
    }
    setNextNotes(data) {
        this.setState({
            nextNotes: data
        })
    }
    setCurrentNotes() {
        this.setState({
            currentNotes: this.state.nextNotes
        })
    }
    random(num) {
        return Math.floor(Math.random() * num);
    }
    componentWillReceiveProps(nextProps) {
        // 再生されたらランダムで取得したnotesをsetnextNoteにset
        if (nextProps.playState) {
            this.setNextNotes(this.randomNotes());
        } else {
            // 停止時初期化
            // TODO: clearTimeoutの条件用意
            clearTimeout(this.playingCount);
            this.stateInit();
        }

        // preCount終了後、currentNotesをsetしてカウントスタート
        if (nextProps.playingCountState) {
            this.setCurrentNotes();
            this.playingCountStart();
        }
    }
    render() {
        const stringCell = this.props.playState ? <StringCell stringClassName={ this.props.stringType } /> : null;
        return (
            <div>
                {(() => {
                    console.log('this.props.preCountState || this.props.playingCountState', this.props.preCountState, this.props.playingCountState)
                    if (this.props.preCountState || this.props.playingCountState) {
                        return <NotesCell notesClassName={this.state.nextNotes.notes} keySignatureClassName={this.state.nextNotes.keySignature} key="1" />
                    }

                })()}
                {(() => {

                    if (this.props.playState) {
                        return <NotesCell notesClassName={this.state.currentNotes.notes} keySignatureClassName={this.state.currentNotes.keySignature} key="2" />
                    }
                })()}
                {/* <NotesCell notesClassName={this.state.nextNotes.notes} keySignatureClassName={this.state.nextNotes.keySignature} />
                <NotesCell notesClassName={this.state.currentNotes.notes} keySignatureClassName={this.state.currentNotes.keySignature} /> */}
                { stringCell }
                <div className="p-text-string"></div>
            </div>
        )
    }
}