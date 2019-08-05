import React, { Component } from 'react'
import { Radio, RadioGroup, RadioButton } from "radio-react-native"
import { Text, View, Image } from 'react-native'
import styles from '../styles'

const okIcon = require('../../assets/png/ok_radio.png')
const notOkIcon = require('../../assets/png/not_ok_radio.png')

class Ok extends Component {
    render() {
        const { checked } = this.props;
        if (checked)
            return (
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <View style={styles.okCircle}><Image source={okIcon} style={{ width: 14, height: 11 }} /></View>
                    <Text style={[styles.keyText, { color: '#2730D0' }]}>OK</Text>
                </View>
            )
        else
            return (
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <View style={styles.circle} />
                    <Text style={[styles.keyText, { color: '#9FA0B4' }]}>OK</Text>
                </View>
            )
    }
}

class NotOk extends Component {
    render() {
        const { checked } = this.props;
        if (checked)
            return (
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <View style={styles.notOkCircle}><Image source={notOkIcon} style={{ width: 12, height: 12 }} /></View>
                    <Text style={[styles.keyText, { color: '#EC5836' }]}>Not OK</Text>
                </View>
            )
        else
            return (<View style={{ flexDirection: 'row', padding: 5 }}>
                <View style={styles.circle} />
                <Text style={[styles.keyText, { color: '#9FA0B4' }]}>Not OK</Text>
            </View>
            )
    }
}

export default class OkRadioForm extends Component {
    handle = (value) => {
        if (!this.props.disabled)
            this.props.changeFlag(value)
    }


    render() {
        return (
            <View>
                {this.props.disabled ? (
                    <View style={{ flexDirection: 'row' }} >
                        <NotOk checked={this.props.flag !== undefined && this.props.flag !== null && !this.props.flag} />
                        <Ok checked={this.props.flag !== undefined && this.props.flag !== null && this.props.flag} />
                    </View>
                )
                    : (
                        <RadioGroup
                            defaultChoice={+this.props.flag || -1}
                            onChoose={(value) => this.handle(value)}
                            style={{ flexDirection: 'row' }}
                        >
                            <RadioButton value={false} style={{ flexDirection: 'row' }}>
                                <Radio CustomComponent={NotOk} />
                            </RadioButton>
                            <RadioButton value={true} style={{ flexDirection: 'row' }}>
                                <Radio CustomComponent={Ok} />
                            </RadioButton>
                        </RadioGroup>
                    )}
            </View>
        )
    }
}