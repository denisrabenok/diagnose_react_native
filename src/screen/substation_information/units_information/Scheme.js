import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class Scheme extends Component {
    scheme = this.props.screenProps.scheme

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Transformer feeding: </Text>
                        <Text style={styles.valueText}>{this.scheme.transformerFeeding}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Transformer expected life: </Text>
                        <Text style={styles.valueText}>{this.scheme.transformerExpectedLife}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Redunancy: </Text>
                        <Text style={styles.valueText}>{this.scheme.redunancy}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default Scheme