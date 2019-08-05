import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from '../../styles'

class Panel extends Component {

    render() {
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Name:</Text>
                    <Text style={styles.valueText}>{this.props.documentation.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Type:</Text>
                    <Text style={styles.valueText}>{this.props.documentation.type}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Language:</Text>
                    <Text style={styles.valueText}>{this.props.documentation.language}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Description:</Text>
                    <Text style={styles.valueText}>{this.props.documentation.description}</Text>
                </View>
            </View>
        )
    }
}

export default Panel