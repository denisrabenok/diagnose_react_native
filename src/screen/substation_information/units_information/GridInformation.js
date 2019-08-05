import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class GridInformation extends Component {
    gridInformation = this.props.screenProps.gridInformation

    render() {
        return (
            <ScrollView>

                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Number of voltage systems: </Text>
                        <Text style={styles.valueText}>{this.gridInformation.numberOfVoltageSystems}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Number of phases: </Text>
                        <Text style={styles.valueText}>{this.gridInformation.numberOfPhases}</Text>
                    </View>
                </View>
                
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={[styles.keyText, { flex: 0.6 }]}></Text>
                        <Text style={[styles.keyText, { flex: 0.2 }]}>HV</Text>
                        <Text style={[styles.keyText, { flex: 0.2 }]}>LV</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={[styles.keyText, { flex: 0.6 }]}>Rated power: </Text>
                        <Text style={[styles.valueText, { flex: 0.2 }]}>{this.gridInformation.ratedPowerHV}</Text>
                        <Text style={[styles.valueText, { flex: 0.2 }]}>{this.gridInformation.ratedPowerLV}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={[styles.keyText, { flex: 0.6 }]}>Connection type: </Text>
                        <Text style={[styles.valueText, { flex: 0.2 }]}>{this.gridInformation.connectionTypeHV}</Text>
                        <Text style={[styles.valueText, { flex: 0.2 }]}>{this.gridInformation.connectionTypeLV}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={[styles.keyText, { flex: 0.6 }]}>System voltage: </Text>
                        <Text style={[styles.valueText, { flex: 0.2 }]}>{this.gridInformation.systemVoltageHV}</Text>
                        <Text style={[styles.valueText, { flex: 0.2 }]}>{this.gridInformation.systemVoltageLV}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default GridInformation