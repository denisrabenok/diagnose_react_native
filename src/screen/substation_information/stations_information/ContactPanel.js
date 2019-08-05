import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import styles from '../../../styles'

class ContactPanel extends Component {

    render() {
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Name:</Text>
                    <Text style={styles.valueText}>{this.props.contact.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Phone:</Text>
                    <Text style={styles.valueText}>{this.props.contact.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>E-mail:</Text>
                    <Text style={styles.valueText}>{this.props.contact.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Description:</Text>
                    <Text style={styles.valueText}>{this.props.contact.description}</Text>
                </View>
            </View>
        )
    }
}

export default ContactPanel