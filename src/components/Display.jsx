import React, { Component } from 'react';
import StringCell from './StringCell.jsx';
import NotesCell from './NotesCell.jsx';

// TODO: state管理リファクタ
// TODO: 速度パターンを3種類程つくって値を共通管理
// TODO: stateの初期化リファクタ
export default class Display extends Component {
    constructor(props) {
        super(props);

        const stringTypeReverseArray = this.props.stringTypeArray.concat().reverse();

        this.stringTypeArray = this.props.stringTypeArray.concat(stringTypeReverseArray);
        this.state = {
            currentNote: {
                note: undefined,
                keySignature: null
            },
            nextNote: {
                note: undefined,
                keySignature: null
            },
            currentPlayingCountNum: 1,
            stringName: this.props.stringName
        }
    }
    stateInit() {
        console.log('stateInit!!')
        this.setState({
            currentNote: {
                note: undefined,
                keySignature: null
            },
            nextNote: {
                note: undefined,
                keySignature: null
            },
            currentPlayingCountNum: 1,
            stringName: this.props.stringName
        });
        this.beforeNote = void 0;
    }
    playingCountStart() {
        if (this.state.currentPlayingCountNum === (this.props.stringTypeArray.length * 2) + 1) {
            this.setState({
                currentPlayingCountNum: 1
            })
            this.setCurrentNotes();
        } else if (this.state.currentPlayingCountNum === ((this.props.stringTypeArray.length * 2) - 4)) {//TODO: preCountをpropsで渡す
            this.setNextNotes(this.createRandomNotes())
        }

        this.setState({
            stringName: this.stringTypeArray[this.state.currentPlayingCountNum - 1],
        })
        this.timerId = setTimeout(() => {
            this.setState({
                currentPlayingCountNum: this.state.currentPlayingCountNum + 1,
            })
            this.playingCountStart()
        }, this.props.speed);
    }
    createRandomNotes() {
        let notesArray = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        let keySignatureArray = ['sharp', 'flat', null];

        if (this.beforeNote) {
            notesArray = notesArray.filter(note => note !== this.beforeNote)
        }

        const noteIndex = this.random(notesArray.length);
        const latestNote = notesArray[noteIndex];

        if (-1 < ['c', 'f'].indexOf(latestNote)) {
            keySignatureArray = ['sharp', null];
        } else if (-1 < ['e', 'b'].indexOf(latestNote)) {
            keySignatureArray = ['flat', null];
        }
        const keySignatureIndex = this.random(keySignatureArray.length)

        this.beforeNote = latestNote;
        return {
            note: latestNote,
            keySignature: keySignatureArray[keySignatureIndex]
        }
    }
    setNextNotes(data) {
        this.setState({
            nextNote: data
        })
    }
    setCurrentNotes() {
        this.setState({
            currentNote: this.state.nextNote
        })
    }
    random(num) {
        return Math.floor(Math.random() * num);
    }
    componentWillReceiveProps(nextProps) {
        // 再生されたらランダムで取得したnoteをsetnextNoteにset
        if (nextProps.preCountState) {
            this.setNextNotes(this.createRandomNotes());
        } else if (nextProps.playingCountState) {
            // preCount終了後、currentNoteをsetしてカウントスタート
            this.setCurrentNotes();
            this.playingCountStart();
        } else {
            // 停止時初期化
            // TODO: clearTimeoutの条件用意
            clearTimeout(this.timerId);
            this.stateInit();
        }
    }
    render() {
        return (
            <div>
                <div className="string-view">
                    <StringCell stringClassName={`p-text-${this.state.stringName}`} />
                    <div className="p-text-string"></div>
                </div>
                <div className="note-view">
                    {(() => {
                        // TODO:マジックナンバーを定数に
                        const canDisplayNextNote = this.stringTypeArray.length - 4;

                        if (this.props.preCountState || this.state.currentPlayingCountNum > canDisplayNextNote) {
                            return <NotesCell modClassName="is-next-note" noteClassName={this.state.nextNote.note} keySignatureClassName={this.state.nextNote.keySignature} />
                        } else {
                            return null
                        }

                    })()}
                    {(() => {
                        if (this.props.playingCountState) {
                            return <NotesCell modClassName={null} noteClassName={this.state.currentNote.note} keySignatureClassName={this.state.currentNote.keySignature} />
                        } else {
                            return null
                        }
                    })()}
                </div>
            </div>
        )
    }
}