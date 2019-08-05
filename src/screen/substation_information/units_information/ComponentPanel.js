import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from '../../../styles'

class ComponentPanel extends Component {

    render() {
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Name:</Text>
                    <Text style={styles.valueText}>{this.props.component.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Type:</Text>
                    <Text style={styles.valueText}>{this.props.component.type}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Model:</Text>
                    <Text style={styles.valueText}>{this.props.component.model}</Text>
                </View>
            </View>
        )
    }
}

export default ComponentPanel