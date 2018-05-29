import React, { Component } from 'react'
import CounterCell from './CounterCell.jsx'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPreCountNum: 0,
            items: [
                { id: 0, isCurrent: false },
                { id: 1, isCurrent: false },
                { id: 2, isCurrent: false },
                { id: 3, isCurrent: false },
            ]
        }
    }
    preCountStart() {
        this.setState({
            currentPreCountNum: this.state.currentPreCountNum + 1,
            items: this.state.items.map((element, array) => {
                if (this.state.currentPreCountNum === array) {
                    element.isCurrent = true;
                } else {
                    element.isCurrent = false;
                }
                return element;
            })
        })
        this.preCount = setTimeout(() => {
            if (this.state.currentPreCountNum === 4) {
                clearTimeout();
                this.props.updateState({
                    preCount: false,
                    playingCount: true
                })
            } else {
                this.preCountStart();
            }
        }, this.props.speed);
    }
    componentWillMount() {
        this.preCountStart()
    }
    componentWillUnmount() {
        clearTimeout(this.preCount);
    }
    render() {
        // TODO:itemsのリファクタ
        return (
            <ul className="counter-view">
                <CounterCell isCurrent={this.state.items[0].isCurrent} key={this.state.items[0].id} />
                <CounterCell isCurrent={this.state.items[1].isCurrent} key={this.state.items[1].id} />
                <CounterCell isCurrent={this.state.items[2].isCurrent} key={this.state.items[2].id} />
                <CounterCell isCurrent={this.state.items[3].isCurrent} key={this.state.items[3].id} />
            </ul>
        )
    }
}