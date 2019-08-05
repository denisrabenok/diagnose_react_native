import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class BreakerDescription extends Component {
    description = this.props.screenProps.description

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Localisation: </Text>
                        <Text style={styles.valueText}>{this.description.localisation}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Area of use: </Text>
                        <Text style={styles.valueText}>{this.description.areaOfUse}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Rated voltage: </Text>
                        <Text style={styles.valueText}>{this.description.ratedVoltage}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Rated current: </Text>
                        <Text style={styles.valueText}>{this.description.ratedCurrent}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Breaker medium: </Text>
                        <Text style={styles.valueText}>{this.description.breakerMedium}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Breaker technology: </Text>
                        <Text style={styles.valueText}>{this.description.breakerTechnology}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Gas mass: </Text>
                        <Text style={styles.valueText}>{this.description.gasMass}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#ECECED',
                            margin: 10,
                        }}
                    />
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Type of insulator: </Text>
                        <Text style={styles.valueText}>{this.description.typeOfInsulator}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default BreakerDescription