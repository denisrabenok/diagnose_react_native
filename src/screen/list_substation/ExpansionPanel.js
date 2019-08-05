import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from '../../styles'

class ExpansionPanel extends Component {
    render() {
        return (
            <View
                style={styles.panel}
                onPress={this.props.handlePress} >
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.infoRow, {flex: 1}]}>
                        <Text style={styles.keyText}>Name:</Text>
                        <Text style={styles.valueText}>{this.props.component.name}</Text>
                    </View>
                    <View style={[styles.status, {backgroundColor: this.props.component.status ? '#2730D0' : '#EC5836'}]} />
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Manufacturing number:</Text>
                    <Text style={styles.valueText}>{this.props.component.manufacturingNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Unit:</Text>
                    <Text style={styles.valueText}>{this.props.component.unit}</Text>
                </View>
            </View>
        )
    }
}

export default ExpansionPanel