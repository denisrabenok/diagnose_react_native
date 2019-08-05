import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import styles from '../../../styles'

class DocumentPanel extends Component {

    render() {
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Name:</Text>
                    <Text style={styles.valueText}>{this.props.document.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Description:</Text>
                    <Text style={styles.valueText}>{this.props.document.description}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Type:</Text>
                    <Text style={styles.valueText}>{this.props.document.type}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Language:</Text>
                    <Text style={styles.valueText}>{this.props.document.language}</Text>
                </View>
            </View>
        )
    }
}

export default DocumentPanel