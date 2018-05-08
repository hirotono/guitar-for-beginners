import React, { Component } from 'react'
export default class StringCell extends Component {
    render() {
        return(
            <div className={ this.props.stringClassName }></div>
        )
    }
}