import React, { Component } from 'react';
import StringCell from './StringCell.jsx';

export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCount: 1
        }
    }
    render() {
        const stringCell = this.props.playState ? <StringCell stringClassName={ this.props.stringType } /> : null;

        return (
            <div>
                { stringCell }
                <div className="p-text-string"></div>
            </div>
        )
    }
}