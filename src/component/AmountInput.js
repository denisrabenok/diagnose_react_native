import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native'

import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native'
import styles from '../styles'

class AmountInput extends Component {

    state = {
        comment: this.props.answer.comment,
        expanded: false
    }

    render() {
        const {stringConstants} = this.props;

        return (
            <View style={styles.fieldContainer}>
                <Text style={styles.keyText}>{this.props.question.text}</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        keyboardType={'decimal-pad'}
                        style={[styles.valueContainer, {flex: 1}]}
                        onChangeText={text => {
                            let value = text;
                            if (value.includes(',')) {
                                value = value.replace(',', '.')
                            }
                            this.props.answer.value_dec = parseFloat(value)
                        }}
                        defaultValue={typeof (parseFloat(this.props.answer.value_dec)) === 'number' && this.props.answer.value_dec !== null ? this.props.answer.value_dec + '' : ''}
ex                        editable={this.props.editing}/>
                    <TouchableOpacity
                        style={styles.quantButton}
                        onPress={() => {
                            if (this.props.editing === undefined || this.props.editing) {
                                this.props.answer.value_dec--;
                                this.forceUpdate()
                            }
                        }}>
                        <Image source={require('../../assets/png/minus.png')} style={{width: 18, height: 2}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quantButton}
                        onPress={() => {
                            if (this.props.editing === undefined || this.props.editing) {
                                this.props.answer.value_dec++;
                                this.forceUpdate()
                            }
                        }}>
                        <Image source={require('../../assets/png/plus.png')} style={{width: 18, height: 18}}/>
                    </TouchableOpacity>
                </View>

                {
                    this.props.new ?
                        (
                            <Collapse onToggle={() => this.setState({expanded: !this.state.expanded})}
                                      isCollapsed={this.state.expanded}>
                                <CollapseHeader><Text style={styles.linkText}>{stringConstants.addComment}</Text></CollapseHeader>
                                <CollapseBody>
                                    <TextInput
                                        onChangeText={text => {
                                            this.props.answer.comment = text;
                                            this.setState({comment: text})
                                        }}
                                        style={[styles.valueContainer, {flex: 1}]}
                                        value={this.state.comment}
                                        editable={this.props.editing}
                                    />
                                </CollapseBody>
                            </Collapse>
                        ) : (
                            <TextInput
                                onChangeText={text => {
                                    this.props.answer.comment = text;
                                    this.setState({comment: text})
                                }}
                                style={[styles.valueContainer, {flex: 1}]}
                                value={this.state.comment}
                                editable={this.props.editing}
                            />
                        )
                }

            </View>
        )
    }
}

export default AmountInput