import React, { Component } from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {connect} from "react-redux";
import {addActivity, loadActivityQuestions} from "../model/controller/activityController";
import Lang from "../localization/lang";

class PrimaryRadioForm extends Component {
    render() {
        const stringConstants  = Lang[this.props.language]

        return (
            <RadioForm
                initial={this.props.flag}
                formHorizontal={true}
                style={this.props.style}

            >
                <RadioButton labelHorizontal={true} key={0} >
                    <RadioButtonInput
                        disabled={this.props.disabled}
                        obj={{ label: stringConstants.notDone, value: 0 }}
                        index={0}
                        isSelected={this.props.flag == false}
                        onPress={() => this.props.changeFlag(false)}
                        buttonInnerColor={'#BA5342'}
                        buttonOuterColor={this.props.flag == false ? '#BA5342' : '#999BAC'}
                        buttonSize={12}
                        buttonOuterSize={25}
                    />
                    <RadioButtonLabel
                        disabled={this.props.disabled}
                        obj={{ label:  stringConstants.notDone, value: 0 }}
                        index={0}
                        onPress={() => this.props.changeFlag(false)}
                        labelStyle={{
                            fontSize: 15,
                            color: this.props.flag == false ? '#BA5342' : '#999BAC',
                            marginLeft: 10
                        }}
                    />
                </RadioButton>

                <RadioButton labelHorizontal={true} key={1} style={{ marginLeft: 20 }}>
                    <RadioButtonInput
                        disabled={this.props.disabled}
                        obj={{ label:  stringConstants.done, value: 1 }}
                        index={1}
                        isSelected={this.props.flag == true}
                        onPress={() => this.props.changeFlag(true)}
                        buttonInnerColor={'#2730D0'}
                        buttonOuterColor={this.props.flag == true ? '#2730D0' : '#999BAC'}
                        buttonSize={12}
                        buttonOuterSize={25}
                    />
                    <RadioButtonLabel
                        disabled={this.props.disabled}
                        obj={{ label:  stringConstants.done, value: 1 }}
                        index={1}
                        onPress={() => this.props.changeFlag(true)}
                        labelStyle={{
                            fontSize: 15,
                            color: this.props.flag == true ? '#2730D0' : '#999BAC',
                            marginLeft: 10
                        }}
                    />
                </RadioButton>
            </RadioForm>
        )
    }
}

mapStateToProps = state => {
    return {
        language: state.language,
    }
}

export default connect(mapStateToProps, { loadActivityQuestions, addActivity })(PrimaryRadioForm)