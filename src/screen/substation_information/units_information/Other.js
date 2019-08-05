import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class Other extends Component {
    other = this.props.screenProps.other

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Main tank grounded: </Text>
                        <Text style={styles.valueText}>{this.other.mainTankGrounded}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Vacuum proof: </Text>
                        <Text style={styles.valueText}>{this.other.vacuumProof}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default Other