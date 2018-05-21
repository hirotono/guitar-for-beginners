import React, { Component } from 'react'
export default class NotesCell extends Component {
    render() {
        return(
            <div>
                <div className={`p-text-${this.props.notesClassName}`}></div>
                {(() => {
                    if (this.props.keySignatureClassName) {
                        return <div className={`p-text-${this.props.keySignatureClassName}`}></div>
                    }
                })()}
            </div>
        )
    }
}