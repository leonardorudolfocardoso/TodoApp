import React, { Component } from 'react';

import './styles.css';

export default class CheckBox extends Component {
    constructor(props) {
        super();
        this.props = props;
        const { checkState } = this.props;
        this.state = {
            checkState
        }
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }

    toggleCheckBox() {
        var { checkState } = this.state
        if (checkState === "checked") {
            checkState = "unchecked";
        } else {
            checkState = "checked";
        }
        this.setState({ checkState });
    }
    
    render() {
        return (
            <div className="CheckBox" onClick={this.props.customClickEvent}>
                <button 
                    className={this.state.checkState}
                    onClick={this.toggleCheckBox}
                >
                </button>
            </div>
        )
    }
}
