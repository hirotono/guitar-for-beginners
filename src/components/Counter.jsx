import React, { Component } from 'react'
import CounterCell from './CounterCell.jsx'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountId: 0,
            list: [
                { id: 0, isCurrent: false },
                { id: 1, isCurrent: false },
                { id: 2, isCurrent: false },
                { id: 3, isCurrent: false },
            ]
        }
    }
    countStart() {
        this.setState({
            currentCountId: this.state.currentCountId + 1,
            list: this.state.list.map((element, array) => {
                if (this.state.currentCountId === array) {
                    element.isCurrent = true;
                } else {
                    element.isCurrent = false;
                }
                return element;
            })
        })
        this.count = setTimeout(() => {
            if (this.state.currentCountId === 4) {
                clearTimeout();
                this.props.updateState({
                    count: false
                })
            } else {
                this.countStart()
            }
        }, 1000);
    }
    componentDidUpdate() {
        
    }
    componentWillMount() {
        this.countStart()
    }
    componentWillUnmount() {
        clearTimeout(this.count);
    }
    render() {
        return (
            <ul>
                <CounterCell isCurrent={this.state.list[0].isCurrent} key={this.state.list[0].id} />
                <CounterCell isCurrent={this.state.list[1].isCurrent} key={this.state.list[1].id} />
                <CounterCell isCurrent={this.state.list[2].isCurrent} key={this.state.list[2].id} />
                <CounterCell isCurrent={this.state.list[3].isCurrent} key={this.state.list[3].id} />
            </ul>
        )
    }
}