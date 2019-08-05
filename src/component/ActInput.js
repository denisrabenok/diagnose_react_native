import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import PrimaryRadioForm from './PrimaryRadioForm'

import styles from '../styles'

class ActInput extends Component {

    state = {
        comment: this.props.answer.comment,
        expanded: false
    }

    render() {
        return (
            <View style={styles.fieldContainer}>
                <Text style={styles.keyText}>{this.props.question.text.toUpperCase()}</Text>
                <PrimaryRadioForm
                    flag={this.props.answer.value_bool}
                    disabled={this.props.editing !== undefined && !this.props.editing}
                    changeFlag={(flag) => { this.props.answer.value_bool = flag; this.forceUpdate() }}
                    style={styles.radioForm}
                />

                {
                    this.props.new ?
                        (
                            <Collapse onToggle={() => this.setState({ expanded: !this.state.expanded })} isCollapsed={this.state.expanded}>
                                <CollapseHeader><Text style={styles.linkText}>Add comment</Text></CollapseHeader>
                                <CollapseBody>
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

            </View>
        )
    }
}

export default ActInput