import React, { Component } from 'react'
export default class NotesCell extends Component {
    render() {
        return(
            <div className={`note-cell ${this.props.modClassName}`}>
                <div className={`p-text-${this.props.noteClassName}`}></div>
                {(() => {
                    if (this.props.keySignatureClassName) {
                        return <div className={`p-text-${this.props.keySignatureClassName} is-layout-${this.props.noteClassName}`}></div>
                    }
                })()}
            </div>
        )
    }
}