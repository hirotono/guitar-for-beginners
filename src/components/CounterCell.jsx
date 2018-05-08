import React, { Component } from 'react'
export default class CounterCell extends Component {
    render() {
        const iconClassName = this.props.isCurrent ? "p-icon-count-on" : "p-icon-count-off";
        return(
            <li className={iconClassName}></li>
        )
    }
}