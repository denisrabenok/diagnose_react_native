import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import ColoredRadioForm from './ColoredRadioForm'

import styles from '../styles'

class QualityInput extends Component {

    state = {
        comment: this.props.answer.comment,
        expanded: false
    }

    render() {
        const {stringConstants} = this.props;

        return (
            <View style={styles.fieldContainer}>
                <Text style={styles.keyText}>{this.props.question.text}</Text>
                <ColoredRadioForm
                    flag={this.props.answer.value_bool}
                    disabled={this.props.editing !== undefined && !this.props.editing}
                    changeFlag={(flag) => { this.props.answer.value_bool = flag; this.forceUpdate() }}
                    style={styles.radioForm}
                />

                {
                    this.props.new ?
                        (
                            <Collapse onToggle={() => this.setState({ expanded: !this.state.expanded })} isCollapsed={this.state.expanded}>

                                <CollapseHeader><Text style={styles.linkText}>{stringConstants.addComment}</Text></CollapseHeader>
                                <CollapseBody>
                                    <Text style={styles.keyText}>{stringConstants.updatedValue}</Text>
                                    <ColoredRadioForm
                                        flag={this.props.answer.value_bool}
                                        disabled={this.props.editing !== undefined && !this.props.editing}
                                        changeFlag={(flag) => { this.props.answer.value_bool = flag; this.forceUpdate() }}
                                        style={styles.radioForm}
                                    />
                                    <TextInput
                                        onChangeText={text => { this.props.answer.comment = text; this.setState({ comment: text }) }}
                                        style={[styles.valueContainer, { flex: 1 }]}
                                        value={this.state.comment}
                                        editable={this.props.editing}
                                    />
                                </CollapseBody>
                            </Collapse>
                        ) : (
                            <TextInput
                                onChangeText={text => { this.props.answer.comment = text; this.setState({ comment: text }) }}
                                style={[styles.valueContainer, { flex: 1 }]}
                                value={this.state.comment}
                                editable={this.props.editing}
                            />
                        )
                }
                {
                    !this.props.new && this.props.answer.value_bool !== undefined && this.props.answer.value_bool !== null &&
                    (
                        <View>
                            <Text style={styles.keyText}>{stringConstants.updated}</Text>
                            <ColoredRadioForm
                                flag={this.props.answer.value_bool_updated}
                                disabled={this.props.editing !== undefined && !this.props.editing}
                                changeFlag={(flag) => { this.props.answer.value_bool_updated = flag; this.forceUpdate() }}
                                style={styles.radioForm}
                            />
                        </View>
                    )
                }

            </View>
        )
    }
}

export default QualityInput