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
            currentNote: {
                note: undefined,
                keySignature: null
            },
            nextNote: {
                note: undefined,
                keySignature: null
            },
            currentPlayingCountNum: 1
        }
    }
    stateInit() {
        console.log('stateInit')
        this.setState({
            currentNote: {
                note: undefined,
                keySignature: null
            },
            nextNote: {
                note: undefined,
                keySignature: null
            },
            currentPlayingCountNum: 1
        });
        this.beforeNote = void 0;
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
            } else if (this.state.currentPlayingCountNum === (this.props.stringTypeNum - 4)) {//TODO: preCountをpropsで渡す
                this.setNextNotes(this.createRandomNotes())
            }
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
        } else {
            // 停止時初期化
            // TODO: clearTimeoutの条件用意
            clearTimeout(this.playingCount);
            this.stateInit();
        }
        // preCount終了後、currentNoteをsetしてカウントスタート
        if (nextProps.playingCountState) {
            this.setCurrentNotes();
            this.playingCountStart();
        }
    }
    render() {
        const stringCell = this.props.playState ? <StringCell stringClassName={`p-text-${ this.props.stringName }`} /> : null;
        console.log('this.state.nextNote, this.state.currentNote', this.state.nextNote, this.state.currentNote)
        return (
            <div>
                <div className="string-view">
                    {stringCell}
                    <div className="p-text-string"></div>
                </div>
                <div className="note-view">
                    {(() => {
                        // TODO:マジックナンバーを定数に
                        if (this.props.preCountState || this.state.currentPlayingCountNum > 6) {
                            return <NotesCell noteClassName={this.state.nextNote.note} keySignatureClassName={this.state.nextNote.keySignature} />
                        } else {
                            return null
                        }

                    })()}
                    {(() => {
                        if (this.props.playingCountState) {
                            return <NotesCell noteClassName={this.state.currentNote.note} keySignatureClassName={this.state.currentNote.keySignature} />
                        } else {
                            return null
                        }
                    })()}
                </div>
            </div>
        )
    }
}