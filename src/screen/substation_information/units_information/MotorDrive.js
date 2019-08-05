import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class MotorDrive extends Component {
    motorDrive = this.props.screenProps.motorDrive

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Model: </Text>
                        <Text style={styles.valueText}>{this.motorDrive.model}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Operating voltage: </Text>
                        <Text style={styles.valueText}>{this.motorDrive.operatingVoltage}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Motor voltage: </Text>
                        <Text style={styles.valueText}>{this.motorDrive.motorVoltage}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default MotorDrive